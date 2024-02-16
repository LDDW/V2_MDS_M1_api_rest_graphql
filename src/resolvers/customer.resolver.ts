import { CustomerController } from "../controllers/CustomerController";

export async function allCustomers() {
    const customers = await CustomerController.get
    return customers
}

export async function createCustomer() {
    const customer = await CustomerController.create
    return customer
}