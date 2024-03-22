"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishesController = void 0;
const PrismaService_1 = require("../services/PrismaService");
class DishesController {
    /**
     * This function get all dishes (Route : GET /dishes)
     *
     * @returns
     */
    async get(restaurantId) {
        try {
            const dishes = await PrismaService_1.prisma.dish.findMany({
                where: {
                    card: {
                        restaurantId: parseInt(restaurantId)
                    }
                }
            });
            return dishes;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function create a new dishe (Route : POST /dishes)
     *
     * @param name
     * @param price
     * @param cardId
     * @returns
     */
    async create(name, price, restaurantId) {
        try {
            const card = await PrismaService_1.prisma.card.findFirst({
                where: {
                    restaurantId: parseInt(restaurantId)
                }
            });
            if (!card)
                return { error: 'Card not found' };
            const dish = await PrismaService_1.prisma.dish.create({
                data: {
                    name: name,
                    price: price,
                    cardId: card.id
                }
            });
            if (!dish)
                return { error: 'Error to create dish' };
            return dish;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function update the dishe data (Route : PUT /dishes/:id)
     *
     * @param disheId
     * @param name
     * @param price
     * @param cardId
     * @returns
     */
    async update(disheId, name, price, cardId) {
        try {
            const dishe = await PrismaService_1.prisma.dish.update({
                where: {
                    id: parseInt(disheId)
                },
                data: {
                    name: name,
                    price: price,
                    cardId: parseInt(cardId)
                }
            });
            if (!dishe)
                return { error: 'Error to create dishe' };
            return dishe;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function delete the dishe (Route : DELETE /dishes/:id)
     *
     * @param disheId
     * @returns
     */
    async delete(disheId) {
        try {
            const dishe = await PrismaService_1.prisma.dish.delete({
                where: {
                    id: parseInt(disheId)
                }
            });
            if (!dishe)
                return { error: 'Error to delete dishe' };
            return dishe;
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.DishesController = DishesController;
