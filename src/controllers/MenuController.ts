import { prisma } from '../services/PrismaService';

class MenuController {

    /**
     * This function get all menus of card (Route : GET /menus)
     * 
     * @param restaurantId 
     * @returns 
     */
    public async get_menus(restaurantId: string) {
        try {
            const menus = await prisma.restaurant.findMany({
                select: {
                    card: {
                        select: {
                            menu: true
                        },
                        where: {
                            id: parseInt(restaurantId)
                        },
                    }
                }
            });

            if (!menus) return { error: 'Restaurant not found' };

            return menus;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function get a menu (Route : GET /menu/:id)
     * 
     * @param menuId 
     * @returns 
     */
    public async get_menu(menuId: string) {
        try {
            const menu = await prisma.menu.findUnique({
                select: {
                    menuDish: true,
                },
                where: {
                    id: parseInt(menuId)
                }
            });

            if (!menu) return { error: 'Menu not found' };

            return menu;
        } catch (error:any) {
            return {error: error.message};
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
    public async create(restaurantId: string, name: string, description: string, price: number, cardId: string, dishes: any) {
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: {
                    id: parseInt(restaurantId)
                },
                include: {
                    card: true
                }
            });

            if (!restaurant) return { error: 'Restaurant not found' };

            const menu = await prisma.menu.create({
                data: {
                    name: name,
                    description: description,
                    price: price,
                    cardId: restaurant.id
                }
            });

            const dish = await prisma.menuDish.createMany({
                data: dishes.map((item: any) => ({
                    "menuId": menu.id,
                    "dishId": item.dishId
                }))
            })

            if(!menu) return { error: 'Error to create menu' };

            return menu;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function update menu (Route : PUT /menu/:id)
     * 
     * @param menuId
     * @returns 
     */
    public async update(menuId: string, name: string, description: string, price: number, cardId: string) {
        try {
            const menu = await prisma.menu.update({
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

            if(!menu) return { error: 'Error to create menu' };

            return menu;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function delete the menu (Route : DELETE /menu/:id)
     * 
     * @param menuId 
     * @returns message or an error
     */
    public async delete(menuId: string) {
        try {
            const menu = await prisma.menu.delete({
                where: {
                    id: parseInt(menuId)
                }
            });

            if (!menu) return { error: 'Menu not found' };

            return { message: 'Menu deleted' };
        } catch (error:any) {
            return {error: error.message};
        }
    }

}

export {MenuController}