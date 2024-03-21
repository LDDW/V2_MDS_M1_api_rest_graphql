import { customerLogin } from "./CustomerResolver";

import { CustomerController } from "../../controllers/CustomerController";
import { RestaurantController } from "../../controllers/RestaurantController";
import { DeliveryManController } from "../../controllers/DeliveryManController";
import { MenuController } from "../../controllers/MenuController";
import { DishesController } from "../../controllers/DishesController";

const customer = new CustomerController();
const restaurant = new RestaurantController();
const deliveryMan = new DeliveryManController();
const menu = new MenuController();
const dishes = new DishesController();

export const resolvers = {
    customer: async(args:any) => {
        return await customer.get(args.id);
    },
    restaurant: async() => {
        return await restaurant.get();
    },
    deliveryMan: async(args:any) => {
        return await deliveryMan.get(args.id);
    },
    menu: async(args:any) => {
        return await menu.get_menu(args.menuId);
    },
    menus: async(args:any) => {
        return await menu.get_menus(args.restaurantId);
    },
    dish: async(args:any) => {
        return await dishes.get(args.restaurantId);
    },
    customerLogin
}; 