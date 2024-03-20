import { prisma } from '../services/PrismaService';
import { User } from './User';

class RestaurantController extends User {

    constructor() {
        super();
    }

    /**
     * This function get the restaurant data (Route : GET /restaurants)
     * 
     * @param customerId 
     * @returns object of restaurant with Menu and Diches. Or return an error
     */
    public async get() 
    {
        try {
            const restaurant = await prisma.restaurant.findMany({
                include: {
                    card: {
                        include: {
                            menu: true,
                            dish: true
                        }
                    }
                }
            });

            return restaurant;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function login the restaurant (Route : POST /restaurants/login)
     * 
     * @param email 
     * @param password 
     * @returns token of restaurant or an error
     */
    public async login(email: string, password: string)
    {
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: {
                    email: email
                }
            });

            if (!restaurant || !(await super.verifyPassword(password, restaurant?.password || ''))) {
                throw new Error("wrong email or password");
            }

            const token = super.generateToken(restaurant);
            return token;

        } catch (error:any) {
            return {error: error.message};
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
    public async create(name: string, address: string, phone: string, email: string, password: string)
    {
        try {
            const hashedPassword = await super.hashPassword(password);

            const restaurant = await prisma.restaurant.create({
                data: {
                    name: name,
                    address: address,
                    phone: phone,
                    email: email,
                    role: 'restaurant',
                    password: hashedPassword
                }
            });

            await prisma.card.create({
                data: {
                    restaurantId: restaurant.id
                }
            });

            return restaurant;
        } catch (error:any) {
            return {error: error.message};
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
    public async update(restaurantId: string, name: string, address: string, phone: string, email: string, password: string)
    {
        try {

            const hashedPassword = password ? await super.hashPassword(password) : undefined;

            const restaurant = await prisma.restaurant.update({
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

            if(!restaurant) throw new Error("Restaurant not found");

            return restaurant;

        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function delete the restaurant (Route : DELETE /restaurants/:id)
     *  
     * @param restaurantId
     * @returns message or an error
     */
    public async delete(restaurantId: string) 
    {
        try {
            const restaurant = await prisma.restaurant.delete({
                where: {
                    id: parseInt(restaurantId)
                }
            });

            if(!restaurant) throw new Error("Restaurant not found");

            return { message: 'Restaurant deleted' };
        } catch (error:any) {
            return {error: error.message};
        }
    }
    
}

export { RestaurantController }