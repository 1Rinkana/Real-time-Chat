import { Injectable, inject, signal } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, Message, IFrame } from '@stomp/stompjs';
import { WEBSOCKET_URL, WEBSOCKET_DESTINATIONS } from '../../../resources/constants/api.constants';
import { SessionService } from '../../../core/services/session.service';
import { APP_TEXT } from '../../../resources/constants/text.constants';
import { User } from '../../../core/models/user.model';
import {
  ChatMessage,
  JoinResponse,
  PrivateMessageEnvelope,
  UserStateUpdate,
} from '../../../core/models/message.model';

/**
 * Verantwortlich für die STOMP/SockJS-Verbindung des Chats.
 * Hält den gesamten Live-State (Nachrichten, Online-User, aktueller Chat)
 * als Signals, damit die Chat-Page rein deklarativ darauf reagieren kann.
 */
@Injectable({ providedIn: 'root' })
export class ChatWebsocketService {
  private readonly clientId = crypto.randomUUID();
  private stompClient: Client | null = null;

  readonly messages = signal<ChatMessage[]>([]);
  readonly onlineUsers = signal<User[]>([]);
  readonly unreadCounts = signal<Record<string, number>>({});
  readonly selectedChatLabel = signal<string>(APP_TEXT.CHAT.PUBLIC_CHAT_LABEL);
  readonly selectedUserId = signal<string | null>(null);

  private readonly session = inject(SessionService);

  connect(): void {
    if (this.stompClient && this.stompClient.active) {
      return;
    }

    const user = this.session.currentUser();
    if (!user) {
      return;
    }

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(WEBSOCKET_URL),
      connectHeaders: {
        'user-uuid': user.uuid,
        'client-uuid': this.clientId,
      },
      reconnectDelay: 5000,
      onConnect: () => this.onConnected(),
      onStompError: (frame: IFrame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }

  selectPublicChat(): void {
    this.selectedUserId.set(null);
    this.selectedChatLabel.set(APP_TEXT.CHAT.PUBLIC_CHAT_LABEL);
    this.messages.set([]);
    this.send(WEBSOCKET_DESTINATIONS.SEND_OPEN_PUBLIC_CHAT, { clientId: this.clientId });
  }

  selectPrivateChat(user: User): void {
    this.selectedUserId.set(user.uuid);
    this.selectedChatLabel.set(user.username);
    this.messages.set([]);
    this.clearUnread(user.uuid);

    const askedUser = this.session.currentUser();
    if (!askedUser) {
      return;
    }

    this.send(WEBSOCKET_DESTINATIONS.SEND_OPEN_PRIVATE_CHAT, {
      askedUser: askedUser.uuid,
      chatWithUser: user.uuid,
    });
  }

  sendMessage(text: string): void {
    const targetUserId = this.selectedUserId();
    const currentUser = this.session.currentUser();
    if (!currentUser) {
      return;
    }

    const body = targetUserId
      ? { text, sentByUser: currentUser.uuid, isPublic: false, sendToUser: targetUserId }
      : { text, sentByUser: currentUser.uuid, isPublic: true };

    this.send(WEBSOCKET_DESTINATIONS.SEND_NEW_MESSAGE, body);
  }

  private onConnected(): void {
    if (!this.stompClient) {
      return;
    }

    this.stompClient.subscribe(WEBSOCKET_DESTINATIONS.SUBSCRIBE_USERS, (frame: Message) =>
      this.handleUserStateChange(JSON.parse(frame.body) as UserStateUpdate),
    );

    this.stompClient.subscribe(WEBSOCKET_DESTINATIONS.SUBSCRIBE_PUBLIC_NEW_MESSAGE, (frame: Message) => {
      if (this.selectedUserId() === null) {
        this.appendMessage(JSON.parse(frame.body) as ChatMessage);
      }
    });

    this.stompClient.subscribe(
      WEBSOCKET_DESTINATIONS.SUBSCRIBE_PUBLIC_HISTORY(this.clientId),
      (frame: Message) => this.handleJoinResponse(JSON.parse(frame.body) as JoinResponse),
    );

    this.stompClient.subscribe(
      WEBSOCKET_DESTINATIONS.SUBSCRIBE_PUBLIC_MESSAGES(this.clientId),
      (frame: Message) => (JSON.parse(frame.body) as ChatMessage[]).forEach((m) => this.appendMessage(m)),
    );

    this.stompClient.subscribe(WEBSOCKET_DESTINATIONS.SUBSCRIBE_PRIVATE_MESSAGE(this.clientId), (frame: Message) =>
      this.handlePrivateMessage(JSON.parse(frame.body) as PrivateMessageEnvelope),
    );

    this.stompClient.subscribe(
      WEBSOCKET_DESTINATIONS.SUBSCRIBE_PRIVATE_MESSAGES(this.clientId),
      (frame: Message) => (JSON.parse(frame.body) as ChatMessage[]).forEach((m) => this.appendMessage(m)),
    );

    this.send(WEBSOCKET_DESTINATIONS.SEND_JOIN, { clientId: this.clientId });
  }

  private handleJoinResponse(response: JoinResponse): void {
    const currentUserId = this.session.currentUser()?.uuid;
    response.messages.forEach((m) => this.appendMessage(m));
    this.onlineUsers.set(response.onlineUsers.filter((u) => u.uuid !== currentUserId));
  }

  private handleUserStateChange(update: UserStateUpdate): void {
    const currentUserId = this.session.currentUser()?.uuid;
    if (update.user.uuid === currentUserId) {
      return;
    }

    if (update.type === 'OFFLINE') {
      this.onlineUsers.update((users) => users.filter((u) => u.uuid !== update.user.uuid));
      return;
    }

    this.onlineUsers.update((users) =>
      users.some((u) => u.uuid === update.user.uuid) ? users : [...users, update.user],
    );
  }

  private handlePrivateMessage(envelope: PrivateMessageEnvelope): void {
    const message = envelope.message;
    const relevantUserId = this.selectedUserId();

    const isForActiveChat =
      relevantUserId === message.sentByUser.uuid || relevantUserId === envelope.sentTo;

    if (isForActiveChat) {
      this.appendMessage(message);
    } else {
      this.incrementUnread(message.sentByUser.uuid);
    }

    this.moveUserToTop(message.sentByUser.uuid);
  }

  private appendMessage(message: ChatMessage): void {
    this.messages.update((messages) => [...messages, message]);
  }

  private incrementUnread(userId: string): void {
    this.unreadCounts.update((counts) => ({ ...counts, [userId]: (counts[userId] ?? 0) + 1 }));
  }

  private clearUnread(userId: string): void {
    this.unreadCounts.update((counts) => ({ ...counts, [userId]: 0 }));
  }

  private moveUserToTop(userId: string): void {
    this.onlineUsers.update((users) => {
      const target = users.find((u) => u.uuid === userId);
      if (!target) {
        return users;
      }
      return [target, ...users.filter((u) => u.uuid !== userId)];
    });
  }

  private send(destination: string, body: unknown): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  }
}
