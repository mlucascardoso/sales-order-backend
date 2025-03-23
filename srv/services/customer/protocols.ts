import { Either } from '@sweet-monads/either';

import { AbstractError } from '@/errors';
import { Customers } from '@models/sales';

export interface CustomerService {
    afterRead(customerList: Customers): Either<AbstractError, Customers>;
}
