import { Request, Response, NextFunction } from "express";

export function hasRole(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        let roleFound = false;
        role.forEach((role) => {
            if (req.user.role === role) {
                roleFound = true;
                return next();
            }
        });

        if (!roleFound) {
            return res.status(403).json({ error: "Forbidden" });
        }
    }
}