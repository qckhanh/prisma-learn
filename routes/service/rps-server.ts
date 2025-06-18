// === FILE: /backend/rps-server.ts ===
import { WebSocketServer } from 'ws';
import {
  MessageRouter,
  WebSocketCore,
} from '../../framework/websocket-framework';

let players: string[] = [];
let moves: { clientId: string; move: string }[] = [];
let round = 1;

function decideWinner(p1: string, p2: string): number {
  if (p1 === p2) return 0;
  if (
    (p1 === 'R' && p2 === 'S') ||
    (p1 === 'S' && p2 === 'P') ||
    (p1 === 'P' && p2 === 'R')
  )
    return 1;
  return 2;
}

export function setupRpsServer(wss: WebSocketServer) {
  const core = new WebSocketCore(
    wss,
    MessageRouter.route.bind(MessageRouter),
  );

  MessageRouter.addType('play', (clientId, msg, coreInstance) => {
    const move = msg.move?.toString().trim();
    if (!['R', 'P', 'S'].includes(move)) return;

    coreInstance.sendToAll({
      type: 'chat',
      sender: clientId,
      content: `🔹 ${move === 'R' ? 'Rock' : move === 'P' ? 'Paper' : 'Scissors'}`,
      rawMove: move,
      timestamp: new Date().toISOString(),
    });
  });
}
