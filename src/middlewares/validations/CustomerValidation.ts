import { body } from "express-validator";
import { prisma } from "../../services/PrismaService"

const CustomerLoginValidation = [
    body('email').isEmail().custom(async (value) => {
        const customer = await prisma.customer.findUnique({
            where: {
                email: value
            }
        });
        if (!customer) {
            return Promise.reject('Invalid e-mail');
        }
    }),
    body('password').isString().isLength({ min: 8 })
]

const CustomerCreateValidation = [
    body('firstname', 'firstname is required').isString().isLength({ min: 3 }),
    body('lastname', 'lastname is required').isString().isLength({ min: 3 }),
    body('email').isEmail().custom(async (value) => {
        const customer = await prisma.customer.findUnique({
            where: {
                email: value
            }
        });
        if (customer) {
            return Promise.reject('E-mail already in use');
        }
    }),
    body('password').isString().isLength({ min: 8 })
];


export { CustomerLoginValidation, CustomerCreateValidation }