import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';

class CustomerController {

    static async get(req: Request, res: Response) 
    {
        const users = await prisma.customer.findMany();
        res.send(users);
    }

    static create(req: any, res: any) 
    {
        res.send("Create user");
    }

    static update(req: any, res: any) 
    {
        res.send("Update user");
    }

    static delete(req: any, res: any) 
    {
        res.send("Delete user");
    }

}

export { CustomerController };