import { prisma } from '../services/PrismaService';
import { User } from './User';

class CustomerController extends User {

    constructor() {
        super();
    }

    /**
     * This function get the customer data logged in (Route : GET /customer)
     * 
     * @param customerId 
     * @returns object of customer or an error
     */
    public async get(customerId: string) 
    {
        try {
            const customer = await prisma.customer.findUnique({
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

            if(!customer) throw new Error("Customer not found")

            return customer;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function login the customer (Route : POST /customer/login)
     * 
     * @param email 
     * @param password 
     * @returns token of customer or an error
     */
    public async login(email: string, password: string)
    {
        try {
            const customer = await prisma.customer.findUnique({
                where: {
                    email: email
                }
            });

            if (!customer || !(await super.verifyPassword(password, customer?.password || ''))) {
                throw new Error("wrong email or password");
            }

            const token = super.generateToken(customer);
            return token;
        } catch (error:any) {
            return {error: error.message};
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
    public async create(firstname: string, lastname: string, email: string, password: string) 
    {
        try {
            const hashedPassword = await super.hashPassword(password);

            const customer = await prisma.customer.create({
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
        } catch (error:any) {
            return {error: error.message};
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
    public async update(customerId: string, lastname: string, firstname:string, email: string, password: string) 
    {
        try {
            const hashedPassword = password ? await super.hashPassword(password) : undefined;

            const customer = await prisma.customer.update({
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

            if(!customer) throw new Error("Customer not found")

            return customer;
        } catch (error:any) {
            return {error: error.message};
        }
    }

    /**
     * This function delete the customer (Route : DELETE /customer/:id)
     * 
     * @param customerId 
     * @returns message or an error
     */
    public async delete(customerId: string) 
    {
        try {
            const customer = await prisma.customer.delete({
                where: {
                    id: parseInt(customerId)
                }
            });

            if(!customer) throw new Error("Customer not found")

            return { msg: 'Customer deleted' };
        } catch (error:any) {
            return {error: error.message};
        }
    }

}

export { CustomerController };