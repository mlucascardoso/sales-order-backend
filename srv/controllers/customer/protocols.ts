import { Customers } from "@models/sales";

export interface CustomerController {
    afterRead(customerList: Customers): Customers;
}
