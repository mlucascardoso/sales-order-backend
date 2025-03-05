import { CustomerModel, CustomerProps } from 'srv/models/customer';

export interface CustomerRepository {
    findById(id: CustomerProps['id']): Promise<CustomerModel | null>;
}
