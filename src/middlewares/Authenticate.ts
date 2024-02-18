import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}  

export function authenticate(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    
        if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
        req.user = user;
    
        next()
    })
}