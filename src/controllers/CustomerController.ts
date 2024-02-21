import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';
import { validationResult } from 'express-validator';
import { User } from './User';

class CustomerController extends User {

    constructor() {
        super();
    }

    // Get / customers : Get a customer
    public async get(userId: any) 
    {
        try {
            const customer = await prisma.customer.findUnique({
                where: {
                    id: parseInt(userId)
                }
            });

            if(!customer) return { message: 'Customer not found' };

            return customer;
        } catch (error) {
            return {error: error};
        }
    }

    // POST /customers/login : Customer login
    public async login(email: string, password: string)
    {

        try {
            // verify email
            const customer = await prisma.customer.findUnique({
                where: {
                    email: email
                }
            });

            if (!customer) {
                return { message: 'Invalid e-mail' };
            }

            // verify password
            const validPassword = await super.verifyPassword(password, customer.password);
            if (!validPassword) {
                return { message: 'Invalid password' };
            }

            // jwt token
            const token = super.generateToken(customer);
            return token;

        } catch (error) {
            return {error: error};
        }
    }

    // POST /customers : Create a new customer
    public async create(req: Request, res: Response) 
    {
        try {
            // verify customerCreateValidator rules in routes.ts
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // hash password
            const hashedPassword = await super.hashPassword(req.body.password);

            // create a new customer
            const customer = await prisma.customer.create({
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    role: 'customer',
                    password: hashedPassword,
                }
            });

            return res.status(201).json({ message: 'Customer created', data: customer});
        } catch (error) {
            return res.status(500).json({error: error});
        }
    }

    // PUT /customers/:id : Update a customer
    public async update(req: Request, res: Response) 
    {
        try {

            // verify customerUpdateValidator rules in routes.ts
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // update customer
            const customer = await prisma.customer.update({
                where: {
                    id: parseInt(req.user.id)
                },
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                }
            });

            if (!customer) return res.status(404).json({ message: 'Customer not found' });

            return res.status(200).json({ message: 'Customer updated', data: customer });
        } catch (error) {
            return res.status(500).json({error: error});
        }
    }

    // DELETE /customers/:id : Delete a customer
    public async delete(req: Request, res: Response) 
    {
        try {
            const customer = await prisma.customer.delete({
                where: {
                    id: parseInt(req.user.id)
                }
            });

            if (!customer) return res.status(404).json({ message: 'Customer not found' });

            return res.status(200).json({ message: 'Customer deleted', data: customer });
        } catch (error) {
            return res.status(500).json({error: error});
        }
    }

}

export { CustomerController };