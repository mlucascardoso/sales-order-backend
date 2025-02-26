import { Customers } from "@models/sales";

export interface CustomerService {
    afterRead(customerList: Customers): Customers;
}
