"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
const socket_io_1 = require("socket.io");
class SocketManager {
    constructor(httpServer, userRepository) {
        this.users = [];
        this.handleConnection = (socket) => {
            socket.on("addUser", (userId) => {
                this.addUser(userId, socket.id);
                console.log(this.users);
            });
            socket.on("blocked", ({ userId }) => __awaiter(this, void 0, void 0, function* () {
                let blockedUser = this.getUser(userId);
                let user = yield this.userRepository.findOne({ _id: userId });
                console.log("user", user);
                console.log("blockedUser ", blockedUser);
                if (user && user._id && blockedUser) {
                    this.io
                        .to(blockedUser.socketId)
                        .emit("responseIsBlocked", { blocked: user.blocked });
                }
            }));
            socket.on("disconnect", () => {
                this.removeUser(socket.id);
                console.log("a user disconnected!");
            });
        };
        this.httpServer = httpServer;
        this.userRepository = userRepository;
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: process.env.CLIENT_URL,
            },
        });
        this.io.on("connection", this.handleConnection);
    }
    addUser(userId, socketId) {
        if (!this.users.some((user) => user.userId === userId)) {
            this.users.push({ userId, socketId });
        }
    }
    removeUser(socketId) {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }
    getUser(userId) {
        return this.users.find((user) => user.userId === userId);
    }
}
exports.SocketManager = SocketManager;
