import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';

class DeliveryManController {

    static get(req: Request, res: Response) 
    {
        res.send("Get all users");
    }

    static create(req: Request, res: Response) 
    {
        res.send("Create user");
    }

    static update(req: Request, res: Response) 
    {
        res.send("Update user");
    }

    static delete(req: Request, res: Response) 
    {
        res.send("Delete user");
    }

}

export { DeliveryManController };