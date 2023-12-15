"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/adapter/express/routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.post('/login', adminController_1.adminLoginController);
router.get('/users', adminController_1.getAllUsersController);
router.patch('/user/edit/:userId', adminController_1.editUserController);
router.patch('/user/block/:userId', adminController_1.blockUserController);
router.patch('/user/unblock/:userId', adminController_1.unblockUserController);
exports.default = router;
