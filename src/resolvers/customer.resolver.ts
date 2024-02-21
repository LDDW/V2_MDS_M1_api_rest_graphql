import { CustomerController } from "../controllers/CustomerController";
import jwt from "jsonwebtoken";

const customerController = new CustomerController();

async function customer(root:any, args:any) {
    // middleware authenticate
    // call controller

   try {
        
        const authHeader = args.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        // if (!token) return res.status(401).json({ message: 'Access Denied' });

        jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        
            // if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
            root.user = user;
        })

        const customer = await customerController.get(root.user.id)
        return customer
   } catch (error) {
         throw new Error("An error occurred during customer");
   }
}

async function customerLogin(root:any, args: any, context:any) {
    try {
        const customer = await customerController.login(root.email, root.password)
        args.res.cookie('token', customer, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, sameSite: 'none', secure: true })
        return customer
    } catch (error) {
        throw new Error("An error occurred during customerLogin");
    }
}

async function customerRegister(req:any, res: any) {
    const customer = customerController.create
    return customer
}

async function customerUpdate(req:any, res: any) {
    // middleware authenticate

    const customer = customerController.create
    return customer
}

async function customerDelete(req:any, res: any) {
    // middleware authenticate
    const customer = customerController.create
    return customer
}

export { customer, customerLogin, customerRegister, customerUpdate, customerDelete }