import { CustomerController } from '@/controllers/customer/protocols';
import { CustomerControllerImpl } from '@/controllers/customer/implementation';
import { customerService } from '@/factories/services/customer';

const makeCustomerController = (): CustomerController => {
    return new CustomerControllerImpl(customerService);
};

export const customerController = makeCustomerController();
