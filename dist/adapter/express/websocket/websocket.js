"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = exports.wss = void 0;
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ noServer: true });
exports.wss = wss;
const clients = new Map();
exports.clients = clients;
wss.on('connection', (ws, req) => {
    const userId = req.headers['user-id'];
    // Store the WebSocket connection in the clients map
    clients.set(userId, ws);
    ws.on('message', (message) => {
        console.log(`Received message from user ${userId}: ${message}`);
    });
    ws.on('close', () => {
        // Remove the WebSocket connection when the user disconnects
        clients.delete(userId);
    });
});
