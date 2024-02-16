import {allCustomers} from "./customer.resolver";
  
//   import { login, sendRecovery, changePassword } from "../modules/auth/auth.resolver";

export const resolvers = {
    Query: {
        allCustomers,
    }
};
  