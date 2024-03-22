"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const CustomerResolver_1 = require("./CustomerResolver");
const CustomerController_1 = require("../../controllers/CustomerController");
const RestaurantController_1 = require("../../controllers/RestaurantController");
const DeliveryManController_1 = require("../../controllers/DeliveryManController");
const MenuController_1 = require("../../controllers/MenuController");
const DishesController_1 = require("../../controllers/DishesController");
const customer = new CustomerController_1.CustomerController();
const restaurant = new RestaurantController_1.RestaurantController();
const deliveryMan = new DeliveryManController_1.DeliveryManController();
const menu = new MenuController_1.MenuController();
const dishes = new DishesController_1.DishesController();
exports.resolvers = {
    customer: async (args) => {
        return await customer.get(args.id);
    },
    restaurant: async () => {
        return await restaurant.get();
    },
    deliveryMan: async (args) => {
        return await deliveryMan.get(args.id);
    },
    menu: async (args) => {
        return await menu.get_menu(args.menuId);
    },
    menus: async (args) => {
        return await menu.get_menus(args.restaurantId);
    },
    dish: async (args) => {
        return await dishes.get(args.restaurantId);
    },
    customerLogin: CustomerResolver_1.customerLogin
};
