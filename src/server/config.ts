import dotenv from "dotenv";

export class ServerConfig {
  constructor() {
    dotenv.config();
  }

  get port(): number {
    return Number(process.env.PORT);
  }

  get host(): string | undefined {
    return process.env.HOST;
  }
}
