// Zentrale Definition aller Backend-Endpunkte.

export const API_BASE_URL = 'http://localhost:28852';
export const WEBSOCKET_URL = `${API_BASE_URL}/messages-websocket`;

export const API_ENDPOINTS = {
  USER: '/user',
  USER_PROFILE: '/user/profile',
  USER_SETTINGS: '/user/settings',
  APP_SETTINGS: '/app/settings',
} as const;

export const WEBSOCKET_DESTINATIONS = {
  SUBSCRIBE_USERS: '/chat/users',
  SUBSCRIBE_PUBLIC_NEW_MESSAGE: '/chat/public/new-message',
  SUBSCRIBE_PUBLIC_HISTORY: (clientId: string) => `/chat/public/history/client/${clientId}`,
  SUBSCRIBE_PUBLIC_MESSAGES: (clientId: string) => `/chat/public/messages/client/${clientId}`,
  SUBSCRIBE_PRIVATE_MESSAGE: (clientId: string) => `/chat/private/client/${clientId}`,
  SUBSCRIBE_PRIVATE_MESSAGES: (clientId: string) => `/chat/private/messages/client/${clientId}`,

  SEND_NEW_MESSAGE: '/app/new-message',
  SEND_JOIN: '/app/join',
  SEND_OPEN_PRIVATE_CHAT: '/app/chat/private',
  SEND_OPEN_PUBLIC_CHAT: '/app/chat/public',
} as const;
