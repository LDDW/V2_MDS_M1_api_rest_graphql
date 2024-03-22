"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerController_1 = require("./controllers/CustomerController");
const RestaurantController_1 = require("./controllers/RestaurantController");
const DeliveryManController_1 = require("./controllers/DeliveryManController");
const MenuController_1 = require("./controllers/MenuController");
const DishesController_1 = require("./controllers/DishesController");
const DeliveriesController_1 = require("./controllers/DeliveriesController");
const Authenticate_1 = require("./middlewares/Authenticate");
const HasRole_1 = require("./middlewares/HasRole");
const { body, validationResult } = require('express-validator');
// create a new router
const router = (0, express_1.Router)();
// instance of the controllers
const customerController = new CustomerController_1.CustomerController();
const restaurantController = new RestaurantController_1.RestaurantController();
const deliveryManController = new DeliveryManController_1.DeliveryManController();
const menuController = new MenuController_1.MenuController();
const disheController = new DishesController_1.DishesController();
const deliverieController = new DeliveriesController_1.DeliverieController();
// function wrapper for routes
const wrapper = async (func, req, res) => {
    try {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            throw resultValidation.array();
        }
        const controllerResponse = await func;
        return res.status(200).json(controllerResponse);
    }
    catch (error) {
        return res.status(404).json(error);
    }
};
router.get("/", (req, res) => {
    res.send("Welcome to the UberEatLike API");
});
// Customer routes
router.post("/customer/login", body("email")
    .notEmpty()
    .withMessage("L'email est requis"), body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe est requis"), async (req, res) => {
    await wrapper(customerController.login(req.body.email, req.body.password), req, res);
});
router.post("/customer", body("firstname")
    .notEmpty()
    .withMessage("Le prénom est requis"), body("lastname")
    .notEmpty()
    .withMessage("Le nom est requis"), body("email")
    .notEmpty()
    .withMessage("L'email est requis"), body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe est requis"), async (req, res) => {
    await wrapper(customerController.create(req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
});
router.get("/customer", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['customer']), async (req, res) => {
    await wrapper(customerController.get(req.user.id), req, res);
});
router.put("/customer/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['customer']), async (req, res) => {
    if (req.user.id != req.params.id)
        return res.status(403).json({ error: "Forbidden" });
    await wrapper(customerController.update(req.params.id, req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
});
router.delete("/customer/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['customer']), async (req, res) => {
    if (req.user.id != req.params.id)
        return res.status(403).json({ error: "Forbidden" });
    await wrapper(customerController.delete(req.params.id), req, res);
});
// Restaurants routes
router.post("/restaurants/login", body("email")
    .notEmpty()
    .withMessage("L'email est requis"), body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe est requis"), async (req, res) => {
    await wrapper(restaurantController.login(req.body.email, req.body.password), req, res);
});
router.post("/restaurants", body("name")
    .notEmpty()
    .withMessage("Le nom est requis"), body("address")
    .notEmpty()
    .withMessage("L'adresse est requise"), body("phone")
    .notEmpty()
    .withMessage("Le numéro de téléphone est requis"), body("email")
    .notEmpty()
    .withMessage("L'email est requis"), body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe est requis"), async (req, res) => {
    await wrapper(restaurantController.create(req.body.name, req.body.address, req.body.phone, req.body.email, req.body.password), req, res);
});
router.get("/restaurants", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(restaurantController.get(), req, res);
});
router.put("/restaurants/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), body("name")
    .notEmpty()
    .withMessage("Le nom est requis"), body("address")
    .notEmpty()
    .withMessage("L'adresse est requise"), body("phone")
    .notEmpty()
    .withMessage("Le numéro de téléphone est requis"), body("email")
    .notEmpty()
    .withMessage("L'email est requis"), async (req, res) => {
    if (req.user.id != req.params.id)
        return res.status(403).json({ error: "Forbidden" });
    await wrapper(restaurantController.update(req.params.id, req.body.name, req.body.address, req.body.phone, req.body.email, req.body.password), req, res);
});
router.delete("/restaurants/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), async (req, res) => {
    if (req.user.id != req.params.id)
        return res.status(403).json({ error: "Forbidden" });
    await wrapper(restaurantController.delete(req.params.id), req, res);
});
// Delivery man routes
router.post("/deliveryman/login", body("email")
    .notEmpty()
    .withMessage("L'email est requis"), body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe est requis"), async (req, res) => {
    await wrapper(deliveryManController.login(req.body.email, req.body.password), req, res);
});
router.post("/deliveryman", async (req, res) => {
    await wrapper(deliveryManController.create(req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
});
router.get("/deliveryman", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(deliveryManController.get(req.user.id), req, res);
});
router.put("/deliveryman/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['deliveryMan']), async (req, res) => {
    if (req.user.id != req.params.id)
        return res.status(403).json({ error: "Forbidden" });
    await wrapper(deliveryManController.update(req.params.id, req.body.firstname, req.body.lastname, req.body.email, req.body.password), req, res);
});
router.delete("/deliveryman/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['deliveryMan']), async (req, res) => {
    if (req.user.id != req.params.id)
        return res.status(403).json({ error: "Forbidden" });
    await wrapper(deliveryManController.delete(req.params.id), req, res);
});
// Menu routes
router.get("/menus", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(menuController.get_menus(req.params.id), req, res);
});
router.get("/menu/:id", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(menuController.get_menu(req.params.id), req, res);
});
router.post("/menu", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), async (req, res) => {
    await wrapper(menuController.create(req.params.id, req.body.name, req.body.description, req.body.price, req.body.cardId, req.body.dishes), req, res);
});
router.put("/menu/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), Authenticate_1.authenticate, async (req, res) => {
    await wrapper(menuController.update(req.params.menuId, req.body.name, req.body.description, req.body.price, req.body.cardId), req, res);
});
router.delete("/menu/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), Authenticate_1.authenticate, async (req, res) => {
    await wrapper(menuController.delete(req.user.id), req, res);
});
// Dishes routes
router.get("/dishes", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(disheController.get(req.params.id), req, res);
});
router.post("/dishes", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), async (req, res) => {
    await wrapper(disheController.create(req.body.name, req.body.price, req.params.id), req, res);
});
router.put("/dishes/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), async (req, res) => {
    await wrapper(disheController.update(req.params.id, req.body.name, req.body.price, req.body.cardId), req, res);
});
router.delete("/dishes/:id", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['restaurant']), async (req, res) => {
    await wrapper(disheController.delete(req.user.id), req, res);
});
// Deliveries routes
router.get("/deliveries", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(deliverieController.get(req.user), req, res);
});
router.post("/deliveries", Authenticate_1.authenticate, (0, HasRole_1.hasRole)(['customer']), async (req, res) => {
    await wrapper(deliverieController.create(req.body.customer, req.body.restaurant, req.body.orders), req, res);
});
router.delete("/deliveries/:id", Authenticate_1.authenticate, async (req, res) => {
    await wrapper(deliverieController.delete(req.params.id), req, res);
});
exports.default = router;
