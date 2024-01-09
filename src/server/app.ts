import express from "express";
import http from "http";
import WebSocket from "ws";
import { ServerConfig } from "./config";

export class App {
  private app: express.Application;
  private server: http.Server;
  private wss: WebSocket.Server;
  private config = new ServerConfig();

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocket.Server({ server: this.server });
  }

  public start(): void {
    try {
      this.configure();
      this.startServer();
    } catch (error) {
      process.exit(1);
    }
  }

  private startServer(): void {
    this.server.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
    });
  }

  private configure(): void {
    this.wss.on("connection", (ws) => {
      // Handle messages from clients
      ws.on("message", (message) => {
        // Broadcast the message to all clients
        this.wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    });
  }
}
