export interface Message {
  type: 'chat' | 'info' | 'error';
  sender?: string;
  content?: string;
  message?: string;
  timestamp?: string;
}

export interface Client {
  id: string;
  ws: WebSocket;
}
