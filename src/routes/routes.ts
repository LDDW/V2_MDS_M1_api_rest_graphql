import { Router } from "express";
import { Request, Response } from 'express';

// controllers
import { CustomerController } from "../controllers/CustomerController";
import { RestaurantController } from "../controllers/RestaurantController";
import { DeliveryManController } from "../controllers/DeliveryManController";
import { MenuController } from "../controllers/MenuController";
import { DishesController } from "../controllers/DishesController";
import { DeliverieController } from "../controllers/DeliveriesController";

// validators
import { CustomerLoginValidation, CustomerCreateValidation, CustomerUpdateValidation } from "../middlewares/validations/CustomerValidation";
// middleware
import { authenticate } from "../middlewares/Authenticate";
import { validated } from "../middlewares/Validated";

// create a new router
const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the API");
})

// Customer routes
const customerController = new CustomerController();
router.get("/customer", authenticate, async (req:Request, res:Response) => {
    try {
        const customer = await customerController.get(req.user.id);
        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.post("/customer/login", CustomerLoginValidation, validated, async (req:Request, res:Response) => {
    try {
        const customer = await customerController.login(req.body.email, req.body.password);
        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.post("/customer", CustomerCreateValidation, customerController.create);
router.put("/customer/:id", authenticate, CustomerUpdateValidation, customerController.update);
router.delete("/customer/:id", authenticate, customerController.delete);

// Restaurants routes
router.get("/restaurants", RestaurantController.get);
router.post("/restaurants", RestaurantController.create);
router.put("/restaurants/:id", RestaurantController.update);
router.delete("/restaurants/:id", RestaurantController.delete);

// Delivery man routes
router.get("/deliveryman", DeliveryManController.get);
router.post("/deliveryman", DeliveryManController.create);
router.put("/deliveryman/:id", DeliveryManController.update);
router.delete("/deliveryman/:id", DeliveryManController.delete);

// Menu routes
router.get("/menu", MenuController.get);
router.post("/menu", MenuController.create);
router.put("/menu/:id", MenuController.update);
router.delete("/menu/:id", MenuController.delete);

// Deliveries routes
router.get("/deliveries", DeliverieController.get);
router.post("/deliveries", DeliverieController.create);
router.delete("/deliveries/:id", DeliverieController.delete);

// Dishes routes
router.get("/dishes", DishesController.get);
router.post("/dishes", DishesController.create);
router.put("/dishes/:id", DishesController.update);
router.delete("/dishes/:id", DishesController.delete);

export default router;