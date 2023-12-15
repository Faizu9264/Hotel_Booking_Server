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
exports.unblockUserController = exports.blockUserController = exports.editUserController = exports.getAllUsersController = exports.adminLoginController = void 0;
const adminUseCase_1 = require("../../../usecase/adminUseCase");
const authUtils_1 = require("../../../infrastructure/utils/authUtils");
const adminLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const adminUseCase = new adminUseCase_1.DefaultAdminUseCase();
        const tokenPair = yield adminUseCase.login(email, password);
        if (tokenPair) {
            const accessToken = (0, authUtils_1.generateAccessToken)({ email }, 'admin');
            res.status(200).json({ message: 'Admin login successful', accessToken });
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Error in adminLoginController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.adminLoginController = adminLoginController;
const getAllUsersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming you have a method in your AdminUseCase to get all users
        const adminUseCase = new adminUseCase_1.DefaultAdminUseCase();
        const users = yield adminUseCase.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error in getAllUsersController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllUsersController = getAllUsersController;
const editUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedDetails = req.body;
        const adminUseCase = new adminUseCase_1.DefaultAdminUseCase();
        yield adminUseCase.editUserById(userId, updatedDetails);
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('Error in editUserController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.editUserController = editUserController;
const blockUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const adminUseCase = new adminUseCase_1.DefaultAdminUseCase();
        yield adminUseCase.blockUser(userId);
        res.status(200).json({ message: 'User blocked successfully' });
    }
    catch (error) {
        console.error('Error in blockUserController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.blockUserController = blockUserController;
const unblockUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const adminUseCase = new adminUseCase_1.DefaultAdminUseCase();
        yield adminUseCase.unblockUser(userId);
        res.status(200).json({ message: 'User unblocked successfully' });
    }
    catch (error) {
        console.error('Error in unblockUserController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.unblockUserController = unblockUserController;
