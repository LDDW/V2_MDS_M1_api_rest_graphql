"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const PrismaService_1 = require("../services/PrismaService");
class MenuController {
    /**
     * This function get all menus of card (Route : GET /menus)
     *
     * @param restaurantId
     * @returns
     */
    async get_menus(restaurantId) {
        try {
            const menus = await PrismaService_1.prisma.menu.findMany({
                where: {
                    card: {
                        restaurantId: parseInt(restaurantId)
                    }
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                },
            });
            if (!menus)
                return { error: 'Restaurant not found' };
            return menus;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function get a menu (Route : GET /menu/:id)
     *
     * @param menuId
     * @returns
     */
    async get_menu(menuId) {
        try {
            const menu = await PrismaService_1.prisma.menu.findUnique({
                where: {
                    id: parseInt(menuId)
                },
                include: {
                    menuDish: {
                        include: {
                            dish: true
                        }
                    }
                }
            });
            console.log(menu);
            if (!menu)
                return { error: 'Menu not found' };
            return menu;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function create menu (Route : POST /menu)
     *
     * @param name
     * @param description
     * @param price
     * @param cardId
     * @returns
     */
    async create(restaurantId, name, description, price, cardId, dishes) {
        try {
            const restaurant = await PrismaService_1.prisma.restaurant.findUnique({
                where: {
                    id: parseInt(restaurantId)
                },
                include: {
                    card: true
                }
            });
            if (!restaurant)
                return { error: 'Restaurant not found' };
            const menu = await PrismaService_1.prisma.menu.create({
                data: {
                    name: name,
                    description: description,
                    price: price,
                    cardId: restaurant.id
                }
            });
            const dish = await PrismaService_1.prisma.menuDish.createMany({
                data: dishes.map((item) => ({
                    "menuId": menu.id,
                    "dishId": item.dishId
                }))
            });
            if (!menu)
                return { error: 'Error to create menu' };
            return menu;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function update menu (Route : PUT /menu/:id)
     *
     * @param menuId
     * @returns
     */
    async update(menuId, name, description, price, cardId) {
        try {
            const menu = await PrismaService_1.prisma.menu.update({
                where: {
                    id: parseInt(menuId)
                },
                data: {
                    name: name,
                    description: description,
                    price: price,
                    cardId: parseInt(cardId)
                }
            });
            if (!menu)
                return { error: 'Error to create menu' };
            return menu;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    /**
     * This function delete the menu (Route : DELETE /menu/:id)
     *
     * @param menuId
     * @returns message or an error
     */
    async delete(menuId) {
        try {
            const menu = await PrismaService_1.prisma.menu.delete({
                where: {
                    id: parseInt(menuId)
                }
            });
            if (!menu)
                return { error: 'Menu not found' };
            return { message: 'Menu deleted' };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.MenuController = MenuController;
