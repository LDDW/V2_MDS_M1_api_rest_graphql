import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';

class MenuController {

    static get(req: Request , res: Response) {

        return res.send("Get menu");

    }

    static create() {
        
    }

    static update() {

    }

    static delete() {

    }

}

export { MenuController}