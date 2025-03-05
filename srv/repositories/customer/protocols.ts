import { CustomerModel, CustomerProps } from '@/models/customer';

export interface CustomerRepository {
    findById(id: CustomerProps['id']): Promise<CustomerModel | null>;
}
