import { CustomerController } from './protocols';
import { CustomerService } from 'srv/services/customer/protocols';
import { Customers } from '@models/sales';

export class CustomerControllerImpl implements CustomerController {
    constructor(private readonly service: CustomerService) {}

    public afterRead(customerList: Customers): Customers {
        return this.service.afterRead(customerList);
    }
}
