// Alle im UI sichtbaren, potenziell änderbaren Texte werden zentral hier gepflegt.
// So kann Copy angepasst werden, ohne Komponenten-Code zu berühren.

export const APP_TEXT = {
  APP_TITLE: 'Chat',

  NAVIGATION: {
    CHAT: 'Chat',
    PROFILE: 'Profil',
    USER_SETTINGS: 'Einstellungen',
    APP_SETTINGS: 'App-Einstellungen',
    LOGOUT: 'Abmelden',
  },

  REGISTRATION: {
    TITLE: 'Willkommen',
    USERNAME_PLACEHOLDER: 'Benutzernamen eingeben...',
    SEND_BUTTON: 'Senden',
    ERROR_MESSAGE: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.',
  },

  CHAT: {
    PUBLIC_CHAT_LABEL: 'Öffentlicher Chat',
    MESSAGE_PLACEHOLDER: 'Nachricht eingeben...',
    SEND_BUTTON: 'Senden',
    NO_MESSAGES: 'Noch keine Nachrichten.',
    ONLINE_USERS_TITLE: 'Online',
  },

  USER_PROFILE: {
    TITLE: 'Benutzerprofil',
    USERNAME_LABEL: 'Benutzername',
    EMAIL_LABEL: 'E-Mail',
    BIO_LABEL: 'Über mich',
    SAVE_BUTTON: 'Speichern',
    SAVE_SUCCESS: 'Profil gespeichert.',
    SAVE_ERROR: 'Profil konnte nicht gespeichert werden.',
  },

  USER_SETTINGS: {
    TITLE: 'Benutzereinstellungen',
    NOTIFICATIONS_LABEL: 'Benachrichtigungen aktivieren',
    SOUND_LABEL: 'Sound bei neuer Nachricht',
    LANGUAGE_LABEL: 'Sprache',
    SAVE_BUTTON: 'Speichern',
    SAVE_SUCCESS: 'Einstellungen gespeichert.',
    SAVE_ERROR: 'Einstellungen konnten nicht gespeichert werden.',
  },

  APP_SETTINGS: {
    TITLE: 'App-Einstellungen',
    THEME_LABEL: 'Design',
    THEME_LIGHT: 'Hell',
    THEME_DARK: 'Dunkel',
    SERVER_URL_LABEL: 'Server-URL',
    SAVE_BUTTON: 'Speichern',
    SAVE_SUCCESS: 'App-Einstellungen gespeichert.',
    SAVE_ERROR: 'App-Einstellungen konnten nicht gespeichert werden.',
  },
} as const;
