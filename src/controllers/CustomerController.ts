import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';
import { validationResult } from 'express-validator';
import { separateOperations } from 'graphql';
import { User } from './User';

class CustomerController extends User {

    constructor() {
        super();
    }

    // Get / customers : Get a customer
    public async get(req: Request, res: Response) 
    {
        try {
            const customer = await prisma.customer.findUnique({
                where: {
                    id: parseInt(req.params.id)
                }
            });
            res.status(200).json({
                data: customer,
            });
        } catch (error) {
            res.status(500).json({
                error: error,
            })
        }
    }

    public async login(req: Request, res: Response)
    {
        try {
            // verify customer login validator rules in routes.ts
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // verify email
            const customer = await prisma.customer.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (!customer) {
                return res.status(400).json({ message: 'Invalid e-mail' });
            }

            // verify password
            const validPassword = await super.verifyPassword(req.body.password, customer.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            // jwt token (role : customer)
            const token = super.generateToken(customer);
            return res.status(200).json({ message: 'Login success', data: { customer, token } });

        } catch (error) {
            return res.status(500).json({ error: error });
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
                    password: hashedPassword,
                }
            });

            return res.status(201).json({ message: 'Customer created', data: customer});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }

    // PUT /customers/:id : Update a customer
    public update(req: Request, res: Response) 
    {
        try {
            const customer = prisma.customer.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    // DELETE /customers/:id : Delete a customer
    public delete(req: Request, res: Response) 
    {
        try {
            const customer = prisma.customer.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

}

export { CustomerController };