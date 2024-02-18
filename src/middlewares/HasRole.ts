import { Request, Response, NextFunction } from "express";

export function hasRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    }
}