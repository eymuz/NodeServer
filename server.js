// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 2015 });

wss.on("connection", (ws) => {
  console.log("new client connected");

  ws.on("message", (message) => {
    console.log(`message recived: ${message}`);

    // Gelen mesajı diğer tüm clientlere yay
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client is disconnected");
  });
});

console.log("started websocket 2015");
