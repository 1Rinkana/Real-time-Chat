import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { APP_TEXT } from '../../../../resources/constants/text.constants';
import { ChatWebsocketService } from '../../services/chat-websocket.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-chat-page',
  standalone: false,
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit, OnDestroy {
  private readonly chat = inject(ChatWebsocketService);

  readonly text = APP_TEXT.CHAT;

  readonly messages = this.chat.messages;
  readonly onlineUsers = this.chat.onlineUsers;
  readonly unreadCounts = this.chat.unreadCounts;
  readonly selectedChatLabel = this.chat.selectedChatLabel;
  readonly selectedUserId = this.chat.selectedUserId;

  readonly draftMessage = signal('');

  ngOnInit(): void {
    this.chat.connect();
  }

  ngOnDestroy(): void {
    this.chat.disconnect();
  }

  selectPublicChat(): void {
    this.chat.selectPublicChat();
  }

  selectUser(user: User): void {
    this.chat.selectPrivateChat(user);
  }

  send(): void {
    const text = this.draftMessage().trim();
    if (text.length === 0) {
      return;
    }
    this.chat.sendMessage(text);
    this.draftMessage.set('');
  }

  unreadFor(userId: string): number {
    return this.unreadCounts()[userId] ?? 0;
  }
}
