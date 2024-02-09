import { Router } from "express";

// controllers
import { CustomerController } from "../controllers/CustomerController";
import { RestaurantController } from "../controllers/RestaurantController";
import { DeliveryManController } from "../controllers/DeliveryManController";

// create a new router
const router = Router();

// customer
router.get("/customers", CustomerController.get);
router.post("/customers", CustomerController.create);
router.put("/customers/:id", CustomerController.update);
router.delete("/customers/:id", CustomerController.delete);

// restaurants
router.get("/restaurants", RestaurantController.get);
router.post("/restaurants", RestaurantController.create);
router.put("/restaurants/:id", RestaurantController.update);
router.delete("/restaurants/:id", RestaurantController.delete);

// delivery man 
router.get("/deliveryman", DeliveryManController.get);
router.post("/deliveryman", DeliveryManController.create);
router.put("/deliveryman/:id", DeliveryManController.update);
router.delete("/deliveryman/:id", DeliveryManController.delete);

export default router;