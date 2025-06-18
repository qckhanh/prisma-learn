import * as http from 'node:http';
import express, { Express } from 'express';
import applyRoutes from './routes';
import applyGlobalMiddleware from './middleware';
import { WebSocketServer } from 'ws';
import {
  MessageRouter,
  WebSocketCore,
} from './framework/websocket-framework';
import { setupRpsServer } from './routes/service/rps-server';

const PORT = 5001;
const app: Express = express();
/**
 * DO NOT TOUCH THIS FILE
 */
const server = http.createServer(app);

applyGlobalMiddleware(app);

//REST API
applyRoutes(app);

//Websocket
const wss = new WebSocketServer({ server });
setupRpsServer(wss); // gọi logic RPS

// const core = new WebSocketCore(
//   wss,
//   MessageRouter.route.bind(MessageRouter),
// );
// MessageRouter.addType('chat', (clientId, msg, core) => {
//   core.sendToAll({
//     type: 'chat',
//     sender: clientId,
//     content: msg.content,
//     timestamp: new Date().toISOString(),
//   });
// });

server.listen(PORT, async (): Promise<void> => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
