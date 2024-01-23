"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/adapter/app.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
// import cors from "cors";
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const userRepository_1 = __importDefault(require("../../infrastructure/database/repositories/userRepository"));
const Socket_1 = require("../../domain/services/Socket");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
require("dotenv").config();
app.use((0, morgan_1.default)("dev"));
// app.use(
//   cors({
//     origin: process.env.USER_DOMAIN,
//     credentials: true,
//   })
// );
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "Faizu",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
}));
const httpserver = http_1.default.createServer(app);
const socket = new Socket_1.SocketManager(httpserver, userRepository_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.USER_DOMAIN );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
app.use("/admin", adminRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/admin/bookings", adminRoutes_1.default);
app.use("/admin/hotel", hotelRoutes_1.default);
app.use("/user/hotel", hotelRoutes_1.default);
app.use("/admin/room", roomRoutes_1.default);
app.use("/user/room", roomRoutes_1.default);
app.use("/user/bookings", bookingRoutes_1.default);
exports.default = httpserver;
