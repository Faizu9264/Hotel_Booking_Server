"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const app = (0, express_1.default)();
require('dotenv').config();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'Faizu',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
}));
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use('/admin/hotel', hotelRoutes_1.default);
app.use('/user/hotel', hotelRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/auth', authRoutes_1.default);
exports.default = app;
