export interface User {
  uuid: string;
  username: string;
}

export interface UserProfile {
  uuid: string;
  username: string;
  email?: string;
  bio?: string;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  language: string;
}
