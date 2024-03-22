"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerLogin = exports.customer = void 0;
const CustomerController_1 = require("../../controllers/CustomerController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customerController = new CustomerController_1.CustomerController();
async function customer(root, args) {
    // middleware authenticate
    // call controller
    try {
        const authHeader = args.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // if (!token) return res.status(401).json({ message: 'Access Denied' });
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            // if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
            root.user = user;
        });
        const customer = await customerController.get(root.user.id);
        return customer;
    }
    catch (error) {
        throw new Error("An error occurred during customer");
    }
}
exports.customer = customer;
async function customerLogin(root, args, context) {
    try {
        const customer = await customerController.login(root.email, root.password);
        args.res.cookie('token', customer, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, sameSite: 'none', secure: true });
        return customer;
    }
    catch (error) {
        throw new Error("An error occurred during customerLogin");
    }
}
exports.customerLogin = customerLogin;
