"use client"

const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('WebSocket message:', data);
};

export default socket;