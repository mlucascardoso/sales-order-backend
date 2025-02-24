import cds from "@sap/cds";

import { Customer } from "@models/sales";
import { CustomerModel } from "../../models/customer";
import { CustomerRepository } from "./protocols";

export class CustomerRepositoryImpl implements CustomerRepository {
    public async findById(id: string): Promise<CustomerModel> {
        const query = SELECT.one.from('sales.Customers').where({ id });
        const customer: Customer = await cds.run(query);
        return CustomerModel.with(customer?.id, customer?.firstName, customer?.lastName, customer?.email);
    }
}