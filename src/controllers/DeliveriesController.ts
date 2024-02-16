import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';

class DeliverieController {

    static get(req: Request, res: Response)
    {
        return true;
    }

    static create(req: Request, res: Response)
    {
        return true;
    }

    static delete(req: Request, res: Response)
    {
        return true;
    }

}

export { DeliverieController };