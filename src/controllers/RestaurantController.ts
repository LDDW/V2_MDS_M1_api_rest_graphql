import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';

class RestaurantController {

    static get(req: Request, res: Response) 
    {
        res.send("Get all users");
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

export { RestaurantController }