import { CustomerController } from "../controllers/CustomerController";

const customerController = new CustomerController();

async function customer(parent:any, args:any, context:any) {
    // middleware authenticate
    // call controller

    return customer
}

async function customerLogin() {
    const customer = customerController.create
    return customer
}

async function customerRegister() {
    const customer = customerController.create
    return customer
}

async function customerUpdate() {
    // middleware authenticate

    const customer = customerController.create
    return customer
}

async function customerDelete() {
    // middleware authenticate
    const customer = customerController.create
    return customer
}

export { customer, customerLogin, customerRegister, customerUpdate, customerDelete }