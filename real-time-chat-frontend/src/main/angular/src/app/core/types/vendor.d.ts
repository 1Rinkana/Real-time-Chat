declare module 'sockjs-client' {
  export default class SockJS {
    constructor(url: string, _reserved?: unknown, options?: unknown);
  }
}

declare module 'stompjs' {
  export interface Frame {
    body: string;
    headers?: Record<string, string>;
    command?: string;
  }

  export interface Client {
    connect(
      headers: Record<string, string>,
      connectCallback: (frame?: Frame) => void,
      errorCallback?: (error: unknown) => void,
    ): void;
    disconnect(callback: () => void): void;
    subscribe(destination: string, callback: (frame: Frame) => void): { id: string; unsubscribe(): void };
    send(destination: string, headers: Record<string, unknown>, body?: string): void;
  }

  export function over(socket: unknown): Client;
}
