import { WebSocketServer } from "ws";

const port = process.env.PORT || 10000; // Render otomatik PORT verir
const wss = new WebSocketServer({ port });

console.log("WS Server listening on port", port);

wss.on("connection", (ws) => {
  console.log("Yeni biri bağlandı");

  ws.on("message", (msg) => {
    console.log("Mesaj:", msg.toString());
    // herkese ilet
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(msg.toString());
    });
  });

  ws.on("close", () => {
    console.log("Biri çıktı");
  });
});
