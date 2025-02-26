import { Customers } from "@models/sales";
import { CustomerService } from "./protocols";
import { CustomerModel } from "srv/models/customer";

export class CustomersServiceImpl implements CustomerService {
    public afterRead(customersList: Customers): Customers {
        const customers = customersList.map((c) => {
            const customer = CustomerModel.create({
                email: c.email as string,
                firstName: c.firstName as string,
                id: c.id as string,
                lastName: c.lastName as string,
            });
            return customer
                .setDefaultEmailDomain()
                .toObject();
        });
        return customers;
    }
}
