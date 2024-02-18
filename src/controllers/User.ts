import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

abstract class User {
    // hash password
    public async hashPassword(password: string)
    {
        return await hash(password, 10);
    }

    // password verification
    public async verifyPassword(password: string, hashedPassword: string) 
    {
        return await compare(password, hashedPassword);
    }

    // generate token
    public generateToken(customer: any)
    {
        return jwt.sign(customer, process.env.TOKEN_SECRET!, { expiresIn: '1h' })
    }
}

export { User };