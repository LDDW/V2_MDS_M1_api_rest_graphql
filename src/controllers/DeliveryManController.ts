import { Request, Response } from 'express';

class DeliveryManController {

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

export { DeliveryManController };