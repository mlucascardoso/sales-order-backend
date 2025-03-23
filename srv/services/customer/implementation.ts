import { Either, left, right } from '@sweet-monads/either';

import { Customers } from '@models/sales';

import { CustomerModel } from '@/models/customer';
import { CustomerService } from '@/services/customer/protocols';
import { AbstractError, ServerError } from '@/errors';

export class CustomerServiceImpl implements CustomerService {
    public afterRead(customerList: Customers): Either<AbstractError, Customers> {
        try {
            const customers = customerList.map((c) => {
                const customer = CustomerModel.with({
                    id: c.id as string,
                    firstName: c.firstName as string,
                    lastName: c.lastName as string,
                    email: c.email as string
                });
                return customer.setDefaultEmailDomain().toObject();
            });
            return right(customers);
        } catch (error) {
            const errorInstance: Error = error as Error;
            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }
}
