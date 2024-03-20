import { prisma } from '../services/PrismaService';
import { User } from './User';

class DeliveryManController extends User {

    constructor() {
        super();
    }

    /**
     * This function get the
     * 
     * @param deliveryManId
     * @returns
     */
    public async get(deliveryManId: string) {
        try {
            const deliveryMan = await prisma.deliveryMan.findUnique({
                where: {
                    id: parseInt(deliveryManId)
                }
            });
            const deliveries = await prisma.delivery.findMany({
                where: {
                    deliveryManId: parseInt(deliveryManId)
                }
            })

            return {deliveryMan: deliveryMan, deliveries}
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function login the
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    public async login(email: string, password: string) 
    {
        try {
            const deliveryMan = await prisma.deliveryMan.findUnique({
                where: {
                    email: email
                }
            });

            if (!deliveryMan || !(await super.verifyPassword(password, deliveryMan?.password || ''))) {
                throw new Error("wrong email or password");
            }

            const token = super.generateToken(deliveryMan);
            return token;
        } catch (error:any) {
            return {error: error.message};
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
    public async create(firstname: string, lastname: string, email: string, password: string) 
    {
        try {
            const hashedPassword = await super.hashPassword(password);

            const deliveryMan = await prisma.deliveryMan.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    role: 'deliveryMan',
                    password: hashedPassword
                }
            });

            if(!deliveryMan) throw new Error("Error to create deliveryMan");
            
            return deliveryMan;
        } catch (error:any) {
            return {error: error.message};
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
    public async update(deliveryManId: string, firstname: string, lastname: string, email: string, password: string) 
    {
        try {

            const hashedPassword = password ? await super.hashPassword(password) : undefined;

            const deliveryMan = await prisma.deliveryMan.update({
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

            if(!deliveryMan) throw new Error("DeliveryMan not found");

            return deliveryMan;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function delete the
     * 
     * @param deliveryManId 
     * @returns 
     */
    public async delete(deliveryManId: string) 
    {
        try {
            const deliveryMan = await prisma.deliveryMan.delete({
                where: {
                    id: parseInt(deliveryManId)
                }
            });

            if(!deliveryMan) throw new Error("DeliveryMan not found");

            return { msg: 'deliveryMan deleted' };
        } catch (error:any) {
            return {error: error.message};
        }
    }

}

export { DeliveryManController };