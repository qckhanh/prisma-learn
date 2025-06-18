// websocket-framework.ts

import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';

// 🧱 WebSocketCore: quản lý kết nối client và gửi/nhận cơ bản
export class WebSocketCore {
  private clients = new Map<string, WebSocket>();

  constructor(
    wss: WebSocketServer,
    private onMessageCallback: (
      clientId: string,
      raw: WebSocket.RawData,
      core: WebSocketCore,
    ) => void,
  ) {
    wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      const clientId = uuidv4();
      this.clients.set(clientId, ws);
      // 👇 Gửi RIÊNG clientId cho chính client đó
      this.sendTo(clientId, {
        type: 'connection',
        clientId,
      });
      this.sendToAll(
        {
          type: 'info',
          message: `Client ${clientId} connected👋 `,
          clientId,
          timestamp: new Date().toISOString(),
        },
        clientId,
      );

      ws.on('message', raw =>
        this.onMessageCallback(clientId, raw, this),
      );
      ws.on('close', () => {
        this.clients.delete(clientId);
        this.sendToAll(
          {
            type: 'info',
            message: `Client ${clientId} leaved ! 💤`,
            clientId,
            timestamp: new Date().toISOString(),
          },
          clientId,
        );
      });
      ws.on('error', () => this.clients.delete(clientId));
    });
  }

  sendTo(clientId: string, data: any) {
    const ws = this.clients.get(clientId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  sendToAll(data: any, exceptId?: string) {
    const str = JSON.stringify(data);
    this.clients.forEach((ws, id) => {
      if (id !== exceptId && ws.readyState === WebSocket.OPEN) {
        ws.send(str);
      }
    });
  }

  getClients() {
    return [...this.clients.keys()];
  }

  removeClient(clientId: string) {
    this.clients.delete(clientId);
  }
}

// 🧠 MessageRouter: phân phối logic theo loại message
export class MessageRouter {
  private static handlers: Record<string, Function> = {};

  static addType(
    type: string,
    handler: (
      clientId: string,
      msg: any,
      core: WebSocketCore,
    ) => void,
  ) {
    this.handlers[type] = handler;
  }

  static route(
    clientId: string,
    raw: WebSocket.RawData,
    core: WebSocketCore,
  ) {
    try {
      const msg = JSON.parse(raw.toString());
      const handler = this.handlers[msg.type];
      if (handler) handler(clientId, msg, core);
      else
        core.sendTo(clientId, {
          type: 'error',
          message: 'Unknown message type',
        });
    } catch (err) {
      core.sendTo(clientId, {
        type: 'error',
        message: 'Invalid JSON format',
      });
    }
  }
}

// 🧩 Example Module: đăng ký một số message type
MessageRouter.addType('chat', (clientId, msg, core) => {
  core.sendToAll({
    type: 'chat',
    sender: clientId,
    content: msg.content,
    timestamp: new Date().toISOString(),
  });
});

MessageRouter.addType('notify', (clientId, msg, core) => {
  core.sendTo(msg.targetId, {
    type: 'notify',
    title: msg.title,
    content: msg.content,
  });
});

MessageRouter.addType('ping', (clientId, msg, core) => {
  core.sendTo(clientId, { type: 'pong', timestamp: Date.now() });
});

// 🏁 Cách dùng (ví dụ từ server.ts):
// import http from 'http';
// const server = http.createServer();
// const wss = new WebSocketServer({ server });
// const core = new WebSocketCore(wss, MessageRouter.route.bind(MessageRouter));
// server.listen(5001);
