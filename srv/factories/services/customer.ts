import { CustomerService, CustomerServiceImpl } from '@/services/customer';

const makeCustomerService = (): CustomerService => {
    return new CustomerServiceImpl();
};

export const customerService = makeCustomerService();
