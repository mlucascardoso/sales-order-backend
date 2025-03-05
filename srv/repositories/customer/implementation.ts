import cds from '@sap/cds';

import { CustomerRepository } from '@/repositories/customer/protocols';
import { CustomerModel, CustomerProps } from '@/models/customer';

export class CustomerRepositoryImpl implements CustomerRepository {
    public async findById(id: CustomerProps['id']): Promise<CustomerModel | null> {
        const customerQuery = SELECT.one.from('sales.Customers').where({ id });
        const dbCustomer = await cds.run(customerQuery);
        if (!dbCustomer) {
            return null;
        }
        return CustomerModel.with({
            id: dbCustomer.id as string,
            firstName: dbCustomer.firstName as string,
            lastName: dbCustomer.lastName as string,
            email: dbCustomer.email as string
        });
    }
}
