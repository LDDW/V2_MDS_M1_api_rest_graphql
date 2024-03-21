import { prisma } from '../services/PrismaService';

class DeliverieController {

    /**
     * This function get deliveris by user role (Route : GET /deliveries)
     * 
     * @param user 
     * @returns 
     */
    public async get(user: any)
    {
        try {

            switch (user.role) {
                case "customer":

                    const customerDeliveries = await prisma.delivery.findMany({
                        where: {
                            customerId: user.id
                        },
                        include: {
                            restaurant: {
                                select: {
                                    name: true,
                                    address: true,
                                    phone: true
                                }
                            },
                            deliveryMan: {
                                select: {
                                    firstname: true,
                                    lastname: true
                                }
                            },
                            order: {
                                select: {
                                    id: true,
                                    menu: true,
                                    dish: true
                                },
                            }
                        }
                    });
                    return customerDeliveries;

                    break;
                case "restaurant":

                    const restaurtantDeliveries = await prisma.delivery.findMany({
                        where: {
                            restaurantId: user.id
                        },
                        include: {
                            customer: {
                                select: {
                                    firstname: true,
                                    lastname: true
                                }
                            },
                            deliveryMan: {
                                select: {
                                    firstname: true,
                                    lastname: true
                                }
                            },
                            order: {
                                select: {
                                    id: true,
                                    menu: true,
                                    dish: true
                                },
                            }
                        }
                    });
                    return restaurtantDeliveries;

                    break;
                case "deliveryMan":
                    
                    const deliverManDevliveries = await prisma.delivery.findMany({
                        where: {
                            deliveryManId: user.id
                        },
                        include: {
                            customer: {
                                select: {
                                    firstname: true,
                                    lastname: true
                                }
                            },
                            restaurant: {
                                select: {
                                    name: true,
                                    address: true,
                                    phone: true
                                }
                            },
                            order: {
                                select: {
                                    id: true,
                                    menu: true,
                                    dish: true
                                },
                            }
                        }
                    });
                    return deliverManDevliveries;

                    break;
                default:
                    throw new Error("Error in get deliveries");
                    break;
            }
        } catch (error) {
            return {error: error};
        }
    }

    /**
     * This function create a delivery (Route : POST /deliveries)
     * 
     * @param customerId 
     * @param restaurantId 
     * @param orders 
     * @returns 
     */
    public async create(customerId: string, restaurantId: string, orders: any) {
        try {
            const deliveryMan = await prisma.deliveryMan.findMany({});
            const randomDeliveryMan = deliveryMan[Math.floor(Math.random() * deliveryMan.length)];
        
            const delivery = await prisma.delivery.create({
                data: {
                    customerId: parseInt(customerId),
                    restaurantId: parseInt(restaurantId),
                    deliveryManId: randomDeliveryMan.id,
                    date: new Date(),
                }
            });
        
            const createdOrders = await prisma.order.createMany({
                data: orders.map((item: any) => ({
                    deliveryId: delivery.id,
                    menuId: item.menuId !== undefined ? parseInt(item.menuId) : undefined,
                    dishId: item.dishId !== undefined ? parseInt(item.dishId) : undefined,
                }))
            });

            if(!delivery) return { error: 'Error to delivery' };
        
            return delivery;
        } catch (error:any) {
            return { error: error.message };
        }
    }
    
    /**
     * This function delete a delivery (Route : DELETE /deliveries/:id)
     * 
     * @param deliveryId 
     * @returns 
     */
    public async delete(deliveryId: string)
    {
        try {
            const delivery = await prisma.delivery.delete({
                where: {
                    id: parseInt(deliveryId)
                }
            });

            return delivery;
        } catch (error:any) {
            return {error: error.message};
        }
    }

}

export { DeliverieController };