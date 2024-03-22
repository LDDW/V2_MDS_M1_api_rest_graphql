"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const PrismaService_1 = require("../services/PrismaService");
const User_1 = require("./User");
class CustomerController extends User_1.User {
    constructor() {
        super();
    }
    /**
     * This function get the customer data logged in (Route : GET /customer)
     *
     * @param customerId
     * @returns object of customer or an error
     */
    async get(customerId) {
        try {
            const customer = await PrismaService_1.prisma.customer.findUnique({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                },
                where: {
                    id: parseInt(customerId)
                }
            });
            if (!customer)
                throw new Error("Customer not found");
            return customer;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function login the customer (Route : POST /customer/login)
     *
     * @param email
     * @param password
     * @returns token of customer or an error
     */
    async login(email, password) {
        try {
            const customer = await PrismaService_1.prisma.customer.findUnique({
                where: {
                    email: email
                }
            });
            if (!customer || !(await super.verifyPassword(password, (customer === null || customer === void 0 ? void 0 : customer.password) || ''))) {
                throw new Error("wrong email or password");
            }
            const token = super.generateToken(customer);
            return token;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function create a customer (Route : POST /customer)
     *
     * @param firstname
     * @param lastname
     * @param email
     * @param password
     * @returns object of customer or an error
     */
    async create(firstname, lastname, email, password) {
        try {
            const hashedPassword = await super.hashPassword(password);
            const customer = await PrismaService_1.prisma.customer.create({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    role: 'customer',
                    password: hashedPassword,
                }
            });
            return customer;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function update the customer data (Route : PUT /customer/:id)
     *
     * @param customerId
     * @param lastname
     * @param firstname
     * @param email
     * @returns object of customer or an error
     */
    async update(customerId, lastname, firstname, email, password) {
        try {
            const hashedPassword = password ? await super.hashPassword(password) : undefined;
            const customer = await PrismaService_1.prisma.customer.update({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                },
                where: {
                    id: parseInt(customerId)
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hashedPassword
                }
            });
            if (!customer)
                throw new Error("Customer not found");
            return customer;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function delete the customer (Route : DELETE /customer/:id)
     *
     * @param customerId
     * @returns message or an error
     */
    async delete(customerId) {
        try {
            const customer = await PrismaService_1.prisma.customer.delete({
                where: {
                    id: parseInt(customerId)
                }
            });
            if (!customer)
                throw new Error("Customer not found");
            return { msg: 'Customer deleted' };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.CustomerController = CustomerController;
