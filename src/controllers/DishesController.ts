import { prisma } from '../services/PrismaService';

class DishesController {

    /**
     * This function get all dishes (Route : GET /dishes)
     * 
     * @returns 
     */
    public async get()  
    {
        try {
            const dishes = await prisma.dish.findMany();
            return dishes;
        } catch (error:any) {
            return {error: error.message};
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
    public async create(name:string, price:number, restaurantId:string) 
    {
        try {
            const card = await prisma.card.findFirst({
                where: {
                    restaurantId: parseInt(restaurantId)
                }
            });

            if(!card) return { error: 'Card not found' };

            const dishe = await prisma.dish.create({
                data: {
                    name: name,
                    price: price,
                    cardId: card.id
                }
            });

            if(!dishe) return { error: 'Error to create dishe' };

            return dishe;
        } catch (error:any) {
            return {error: error.message};
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
    public async update(disheId: string, name:string, price:number, cardId:string) 
    {
        try {
            const dishe = await prisma.dish.update({
                where: {
                    id: parseInt(disheId)
                },
                data: {
                    name: name,
                    price: price,
                    cardId: parseInt(cardId)
                }
            });

            if(!dishe) return { error: 'Error to create dishe' };

            return dishe;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function delete the dishe (Route : DELETE /dishes/:id)
     * 
     * @param disheId 
     * @returns 
     */
    public async delete(disheId: string) 
    {
        try {
            const dishe = await prisma.dish.delete({
                where: {
                    id: parseInt(disheId)
                }
            });

            if(!dishe) return { error: 'Error to delete dishe' };

            return dishe;
        } catch (error:any) {
            return {error: error.message};
        }
    }
}

export { DishesController }