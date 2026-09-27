import { User } from './user.model';

export type { User };

export interface ChatMessage {
  text: string;
  sentByUser: User;
  sentAt: string;
  isPublic: boolean;
  sendToUser?: string;
}

export interface PrivateMessageEnvelope {
  message: ChatMessage;
  sentTo: string;
}

export type UserStateType = 'ONLINE' | 'OFFLINE';

export interface UserStateUpdate {
  user: User;
  type: UserStateType;
}

export interface JoinResponse {
  messages: ChatMessage[];
  onlineUsers: User[];
}
