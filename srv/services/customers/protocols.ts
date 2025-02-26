import { Customers } from "@models/sales";

export interface CustomerService {
    afterRead(customers: Customers): Customers;
}
