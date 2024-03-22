"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    // hash password
    async hashPassword(password) {
        return await (0, bcrypt_1.hash)(password, 10);
    }
    // password verification
    async verifyPassword(password, hashedPassword) {
        return await (0, bcrypt_1.compare)(password, hashedPassword);
    }
    // generate token
    generateToken(customer) {
        return jsonwebtoken_1.default.sign(customer, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    }
}
exports.User = User;
