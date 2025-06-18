import WebSocket, { WebSocketServer } from 'ws';
import MessageController from '../controller/messageController';
import { Message } from '../type';

class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket>;
  private messageController: MessageController;

  constructor(wss: WebSocketServer) {
    this.wss = wss;
    this.clients = new Map();
    this.messageController = new MessageController();
    this.init();
  }

  private init(): void {
    console.log('WebSocket server initialized');
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client joined -  initialized');

      const clientId = Math.random().toString(36).substring(2);
      this.clients.set(clientId, ws);

      this.sendToAll({
        type: 'info',
        message: `Client ${clientId} connected`,
      });

      ws.on('message', (data: WebSocket.RawData) => {
        try {
          const message: Message = JSON.parse(data.toString());
          this.messageController.handleMessage(
            clientId,
            message,
            this,
          );
        } catch (error) {
          ws.send(
            JSON.stringify({
              type: 'error',
              message: 'Invalid message format',
            }),
          );
        }
      });

      ws.on('close', () => {
        this.clients.delete(clientId);
        this.sendToAll({
          type: 'info',
          message: `Client ${clientId} disconnected`,
        });
      });
    });
  }

  sendToAll(message: Message): void {
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  sendTo(clientId: string, message: Message): void {
    const clientWebsocket = this.clients.get(clientId);
    if (
      clientWebsocket &&
      clientWebsocket.readyState === WebSocket.OPEN
    ) {
      clientWebsocket.send(JSON.stringify(message));
    }
  }
}

export default WebSocketService;
