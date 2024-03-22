"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const PrismaService_1 = require("../services/PrismaService");
const User_1 = require("./User");
class RestaurantController extends User_1.User {
    constructor() {
        super();
    }
    /**
     * This function get the restaurant data (Route : GET /restaurants)
     *
     * @param customerId
     * @returns object of restaurant with Menu and Diches. Or return an error
     */
    async get() {
        try {
            const restaurant = await PrismaService_1.prisma.restaurant.findMany({
                include: {
                    card: {
                        include: {
                            menu: true,
                            dish: true
                        }
                    }
                }
            });
            console.log(restaurant[0].card);
            return restaurant;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function login the restaurant (Route : POST /restaurants/login)
     *
     * @param email
     * @param password
     * @returns token of restaurant or an error
     */
    async login(email, password) {
        try {
            const restaurant = await PrismaService_1.prisma.restaurant.findUnique({
                where: {
                    email: email
                }
            });
            if (!restaurant || !(await super.verifyPassword(password, (restaurant === null || restaurant === void 0 ? void 0 : restaurant.password) || ''))) {
                throw new Error("wrong email or password");
            }
            const token = super.generateToken(restaurant);
            return token;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function create a new restaurant and a card (Route : POST /restaurants)
     *
     * @param name
     * @param address
     * @param phone
     * @param email
     * @param password
     * @returns object of restaurant or an error
     */
    async create(name, address, phone, email, password) {
        try {
            const hashedPassword = await super.hashPassword(password);
            const restaurant = await PrismaService_1.prisma.restaurant.create({
                data: {
                    name: name,
                    address: address,
                    phone: phone,
                    email: email,
                    role: 'restaurant',
                    password: hashedPassword
                }
            });
            await PrismaService_1.prisma.card.create({
                data: {
                    restaurantId: restaurant.id
                }
            });
            return restaurant;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function update the restaurant data (Route : PUT /restaurants/:id)
     *
     * @param restaurantId
     * @param name
     * @param address
     * @param phone
     * @param email
     * @returns object of restaurant or an error
     */
    async update(restaurantId, name, address, phone, email, password) {
        try {
            const hashedPassword = password ? await super.hashPassword(password) : undefined;
            const restaurant = await PrismaService_1.prisma.restaurant.update({
                where: {
                    id: parseInt(restaurantId)
                },
                data: {
                    name: name,
                    address: address,
                    phone: phone,
                    email: email,
                    password: hashedPassword
                }
            });
            if (!restaurant)
                throw new Error("Restaurant not found");
            return restaurant;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function delete the restaurant (Route : DELETE /restaurants/:id)
     *
     * @param restaurantId
     * @returns message or an error
     */
    async delete(restaurantId) {
        try {
            const restaurant = await PrismaService_1.prisma.restaurant.delete({
                where: {
                    id: parseInt(restaurantId)
                }
            });
            if (!restaurant)
                throw new Error("Restaurant not found");
            return { message: 'Restaurant deleted' };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.RestaurantController = RestaurantController;
