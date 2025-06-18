import { Message } from '../type';
import WebSocketService from '../service/websocketService';

class MessageController {
  handleMessage(
    clientId: string,
    message: Message,
    wss: WebSocketService,
  ): void {
    switch (message.type) {
      case 'chat':
        wss.sendToAll({
          type: 'chat',
          sender: clientId,
          content: message.content,
          timestamp: new Date().toISOString(),
        });
        break;
      default:
        wss.sendTo(clientId, {
          type: 'error',
          message: 'Unknown message type',
        });
    }
  }
}

export default MessageController;
