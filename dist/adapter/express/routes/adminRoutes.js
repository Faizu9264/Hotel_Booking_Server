"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/adapter/express/routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// router.get('/users', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript with Express! Admin');
// });
router.post('/login', adminController_1.adminLoginController);
exports.default = router;
