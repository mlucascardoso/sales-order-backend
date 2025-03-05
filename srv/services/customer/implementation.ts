import { CustomerModel } from 'srv/models/customer';
import { CustomerService } from './protocols';
import { Customers } from '@models/sales';

export class CustomerServiceImpl implements CustomerService {
    public afterRead(customerList: Customers): Customers {
        const customers = customerList.map((c) => {
            const customer = CustomerModel.with({
                id: c.id as string,
                firstName: c.firstName as string,
                lastName: c.lastName as string,
                email: c.email as string
            });
            return customer.setDefaultEmailDomain().toObject();
        });
        return customers;
    }
}
