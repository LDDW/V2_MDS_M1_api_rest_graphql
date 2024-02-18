import { Router } from "express";

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

// create a new router
const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the API");
})

// Customer routes
const customerController = new CustomerController();
router.get("/customers", authenticate, customerController.get);
router.post("/customers/login", CustomerLoginValidation, customerController.login);
router.post("/customers", CustomerCreateValidation, customerController.create);
router.put("/customers/:id", authenticate, CustomerUpdateValidation, customerController.update);
router.delete("/customers/:id", authenticate, customerController.delete);

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