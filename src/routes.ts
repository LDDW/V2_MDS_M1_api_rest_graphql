import { Router } from "express";
import { Request, Response } from 'express';
import { CustomerController } from "./controllers/CustomerController";
import { RestaurantController } from "./controllers/RestaurantController";
import { DeliveryManController } from "./controllers/DeliveryManController";
import { MenuController } from "./controllers/MenuController";
import { DishesController } from "./controllers/DishesController";
import { DeliverieController } from "./controllers/DeliveriesController";
import { authenticate } from "./middlewares/Authenticate";
import { hasRole } from "./middlewares/HasRole";
const { body, validationResult } = require('express-validator');

// create a new router
const router = Router();

// instance of the controllers
const customerController = new CustomerController();
const restaurantController = new RestaurantController();
const deliveryManController = new DeliveryManController();
const menuController = new MenuController();
const disheController = new DishesController();
const deliverieController = new DeliverieController();

// function wrapper for routes
const wrapper = async (func:any, req:any, res:any) => {
    try {
        const resultValidation = validationResult(req);

        if(!resultValidation.isEmpty()) {
            throw resultValidation.array();
        }

        const controllerResponse = await func;
        return res.status(200).json(controllerResponse);
    } catch (error) {
        return res.status(404).json(error);
    }
};

router.get("/", (req, res) => {
    res.send("Welcome to the UberEatLike API");
})

// Customer routes
router.post("/customer/login", 

        body("email")
            .notEmpty()
            .withMessage("L'email est requis"),
        body("password")
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage("Le mot de passe est requis"),

    async (req:Request, res:Response) => {
        await wrapper(customerController.login(req.body.email, req.body.password), req, res);
    }
);
router.post("/customer", 

    body("firstname")
        .notEmpty()
        .withMessage("Le prénom est requis"),
    body("lastname")
        .notEmpty()
        .withMessage("Le nom est requis"),
    body("email")
        .notEmpty()
        .withMessage("L'email est requis"),
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Le mot de passe est requis"),

    async (req:Request, res:Response) => {
        await wrapper(customerController.create(req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
    }
);
router.get("/customer", authenticate, hasRole(['customer']), async (req:Request, res:Response) => {
    await wrapper(customerController.get(req.user.id), req, res);
});
router.put("/customer/:id", authenticate, hasRole(['customer']),
    async (req:Request, res:Response) => {
        if(req.user.id != req.params.id) return res.status(403).json({ error: "Forbidden" });
        await wrapper(customerController.update(req.params.id, req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
    }
);
router.delete("/customer/:id", authenticate, hasRole(['customer']), async (req:Request, res:Response) => {
    if(req.user.id != req.params.id) return res.status(403).json({ error: "Forbidden" });
    await wrapper(customerController.delete(req.params.id), req, res);
});

// Restaurants routes
router.post("/restaurants/login", 

        body("email")
            .notEmpty()
            .withMessage("L'email est requis"),
        body("password")
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage("Le mot de passe est requis"),

    async (req:Request, res:Response) => {
        await wrapper(restaurantController.login(req.body.email, req.body.password), req, res);
    }
);
router.post("/restaurants",

    body("name")
        .notEmpty()
        .withMessage("Le nom est requis"),
    body("address")
        .notEmpty()
        .withMessage("L'adresse est requise"),
    body("phone")
        .notEmpty()
        .withMessage("Le numéro de téléphone est requis"),
    body("email")
        .notEmpty()
        .withMessage("L'email est requis"),
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Le mot de passe est requis"),

    async (req:Request, res:Response) => {
        await wrapper(restaurantController.create(req.body.name, req.body.address, req.body.phone, req.body.email, req.body.password), req, res);
    }
);
router.get("/restaurants", authenticate, async (req:Request, res:Response) => {
    await wrapper(restaurantController.get(), req, res);
});
router.put("/restaurants/:id", authenticate, hasRole(['restaurant']),

    body("name")
        .notEmpty()
        .withMessage("Le nom est requis"),
    body("address")
        .notEmpty()
        .withMessage("L'adresse est requise"),
    body("phone")
        .notEmpty()
        .withMessage("Le numéro de téléphone est requis"),
    body("email")
        .notEmpty()
        .withMessage("L'email est requis"),

    async (req:Request, res:Response) => {
        if(req.user.id != req.params.id) return res.status(403).json({ error: "Forbidden" });
        await wrapper(restaurantController.update(req.params.id, req.body.name, req.body.address, req.body.phone, req.body.email, req.body.password), req, res);
    }
);
router.delete("/restaurants/:id", authenticate, hasRole(['restaurant']), async (req:Request, res:Response) => {
    if(req.user.id != req.params.id) return res.status(403).json({ error: "Forbidden" });
    await wrapper(restaurantController.delete(req.params.id), req, res);
});

// Delivery man routes
router.post("/deliveryman/login",

    body("email")
        .notEmpty()
        .withMessage("L'email est requis"),
    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Le mot de passe est requis"),

    async (req:Request, res:Response) => {
        await wrapper(deliveryManController.login(req.body.email, req.body.password), req, res);
    }
);
router.post("/deliveryman",  
    async (req:Request, res:Response) => {
        await wrapper(deliveryManController.create(req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
    }
);
router.get("/deliveryman", authenticate, async (req:Request, res:Response) => {
    await wrapper(deliveryManController.get(req.user.id), req, res);
});
router.put("/deliveryman/:id", authenticate, hasRole(['deliveryMan']),
    async (req:Request, res:Response) => {
        if(req.user.id != req.params.id) return res.status(403).json({ error: "Forbidden" });
        await wrapper(deliveryManController.update(req.params.id, req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
    }
);
router.delete("/deliveryman/:id", authenticate, hasRole(['deliveryMan']), async (req:Request, res:Response) => {
    if(req.user.id != req.params.id) return res.status(403).json({ error: "Forbidden" });
    await wrapper(deliveryManController.delete(req.params.id), req, res);
});

// Menu routes
router.get("/menus", authenticate, async (req:Request, res:Response) => {
    await wrapper(menuController.get_menus(req.params.id), req, res);
});
router.get("/menu/:id", authenticate, async (req:Request, res:Response) => {
    await wrapper(menuController.get_menu(req.params.id), req, res);
});
router.post("/menu", authenticate, hasRole(['restaurant']), async (req:Request, res:Response) => {
    await wrapper(menuController.create(req.params.id, req.body.name, req.body.description, req.body.price, req.body.cardId, req.body.dishes), req, res);
});
router.put("/menu/:id", authenticate, hasRole(['restaurant']), authenticate, async (req:Request, res:Response) => {
    await wrapper(menuController.update(req.params.menuId, req.body.name, req.body.description, req.body.price, req.body.cardId), req, res);
});
router.delete("/menu/:id", authenticate, hasRole(['restaurant']), authenticate, async (req:Request, res:Response) => {
    await wrapper(menuController.delete(req.user.id), req, res);
});
 
// Dishes routes
router.get("/dishes", authenticate, async (req:Request, res:Response) => {
    await wrapper(disheController.get(req.params.id), req, res);
});
router.post("/dishes", authenticate, hasRole(['restaurant']), async (req:Request, res:Response) => {
    await wrapper(disheController.create(req.body.name, req.body.price, req.params.id), req, res);
});
router.put("/dishes/:id", authenticate, hasRole(['restaurant']), async (req:Request, res:Response) => {
    await wrapper(disheController.update(req.params.id, req.body.name, req.body.price, req.body.cardId), req, res);
});
router.delete("/dishes/:id", authenticate, hasRole(['restaurant']), async (req:Request, res:Response) => {
    await wrapper(disheController.delete(req.user.id), req, res);
});

// Deliveries routes
router.get("/deliveries", authenticate, async (req:Request, res:Response) => {
    await wrapper(deliverieController.get(req.user), req, res);
});
router.post("/deliveries", authenticate, hasRole(['customer']),  async (req:Request, res:Response) => {
    await wrapper(deliverieController.create(req.body.customer, req.body.restaurant, req.body.orders), req, res);
});
router.delete("/deliveries/:id", authenticate, async (req:Request, res:Response) => {
    await wrapper(deliverieController.delete(req.params.id), req, res);
});

export default router;