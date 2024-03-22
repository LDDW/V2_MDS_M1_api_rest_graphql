"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access Denied' });
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}
exports.authenticate = authenticate;
