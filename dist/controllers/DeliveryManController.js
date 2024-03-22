"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryManController = void 0;
const PrismaService_1 = require("../services/PrismaService");
const User_1 = require("./User");
class DeliveryManController extends User_1.User {
    constructor() {
        super();
    }
    /**
     * This function get the
     *
     * @param deliveryManId
     * @returns
     */
    async get(deliveryManId) {
        try {
            const deliveryMan = await PrismaService_1.prisma.deliveryMan.findUnique({
                where: {
                    id: parseInt(deliveryManId)
                },
                include: {
                    delivery: true
                }
            });
            console.log(deliveryMan);
            return deliveryMan;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function login the
     *
     * @param email
     * @param password
     * @returns
     */
    async login(email, password) {
        try {
            const deliveryMan = await PrismaService_1.prisma.deliveryMan.findUnique({
                where: {
                    email: email
                }
            });
            if (!deliveryMan || !(await super.verifyPassword(password, (deliveryMan === null || deliveryMan === void 0 ? void 0 : deliveryMan.password) || ''))) {
                throw new Error("wrong email or password");
            }
            const token = super.generateToken(deliveryMan);
            return token;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function create the
     *
     * @param firstname
     * @param lastname
     * @param email
     * @param password
     * @returns
     */
    async create(firstname, lastname, email, password) {
        try {
            const hashedPassword = await super.hashPassword(password);
            const deliveryMan = await PrismaService_1.prisma.deliveryMan.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    role: 'deliveryMan',
                    password: hashedPassword
                }
            });
            if (!deliveryMan)
                throw new Error("Error to create deliveryMan");
            return deliveryMan;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function update the
     *
     * @param deliveryManId
     * @param firstname
     * @param lastname
     * @param email
     * @returns
     */
    async update(deliveryManId, firstname, lastname, email, password) {
        try {
            const hashedPassword = password ? await super.hashPassword(password) : undefined;
            const deliveryMan = await PrismaService_1.prisma.deliveryMan.update({
                where: {
                    id: parseInt(deliveryManId)
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hashedPassword
                }
            });
            if (!deliveryMan)
                throw new Error("DeliveryMan not found");
            return deliveryMan;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function delete the
     *
     * @param deliveryManId
     * @returns
     */
    async delete(deliveryManId) {
        try {
            const deliveryMan = await PrismaService_1.prisma.deliveryMan.delete({
                where: {
                    id: parseInt(deliveryManId)
                }
            });
            if (!deliveryMan)
                throw new Error("DeliveryMan not found");
            return { msg: 'deliveryMan deleted' };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.DeliveryManController = DeliveryManController;
