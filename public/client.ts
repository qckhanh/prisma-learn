interface Message {
  type: 'chat' | 'info' | 'error';
  sender?: string;
  content?: string;
  message?: string;
  timestamp?: string;
}

const ws = new WebSocket('http://localhost:5001');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
  const li = document.createElement('li');
  li.textContent = '[Info] Connected to WebSocket server';
  document.getElementById('messages')?.appendChild(li);
};

ws.onmessage = (event: MessageEvent) => {
  const data: Message = JSON.parse(event.data);
  const li = document.createElement('li');
  if (data.type === 'chat') {
    li.textContent = `[${data.timestamp}] ${data.sender}: ${data.content}`;
  } else if (data.type === 'info') {
    li.textContent = `[Info] ${data.message}`;
  } else {
    li.textContent = `[Error] ${data.message}`;
  }
  document.getElementById('messages')?.appendChild(li);
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
  const li = document.createElement('li');
  li.textContent = '[Info] Disconnected from WebSocket server';
  document.getElementById('messages')?.appendChild(li);
};

function sendMessage(): void {
  const input = document.getElementById(
    'message',
  ) as HTMLInputElement;
  const content = input.value;
  if (content) {
    ws.send(JSON.stringify({ type: 'chat', content }));
    input.value = '';
  }
}

document
  .getElementById('sendButton')
  ?.addEventListener('click', sendMessage);
