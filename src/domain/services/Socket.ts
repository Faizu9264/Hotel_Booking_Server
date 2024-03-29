import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import UserRepository from "../../infrastructure/database/repositories/userRepository";

interface User {
  userId: string;
  socketId: string;
}

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private userRepository: typeof UserRepository;
  private users: User[] = [];

  constructor(httpServer: HttpServer, userRepository: typeof UserRepository) {
    this.httpServer = httpServer;
    this.userRepository = userRepository;
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_URL,
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    socket.on("addUser", (userId: string) => {
      this.addUser(userId, socket.id);
      console.log(this.users);
    });

    socket.on("blocked", async ({ userId }: { userId: string }) => {
      let blockedUser = this.getUser(userId);
      let user = await this.userRepository.findOne({ _id: userId });
      console.log("user", user);
      console.log("blockedUser ", blockedUser);

      if (user && user._id && blockedUser) {
        this.io
          .to(blockedUser.socketId)
          .emit("responseIsBlocked", { blocked: user.blocked });
      }
    });

    socket.on("disconnect", () => {
      this.removeUser(socket.id);
      console.log("a user disconnected!");
    });
  };

  private addUser(userId: string, socketId: string): void {
    if (!this.users.some((user) => user.userId === userId)) {
      this.users.push({ userId, socketId });
    }
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string): User | undefined {
    return this.users.find((user) => user.userId === userId);
  }
}
