import { Customers } from '@models/sales';

import { CustomerController } from '@/controllers/customer/protocols';
import { CustomerService } from '@/services/customer/protocols';
import { BaseControllerImpl, BaseControllerResponse } from '@/controllers/base';

export class CustomerControllerImpl extends BaseControllerImpl implements CustomerController {
    constructor(private readonly service: CustomerService) {
        super();
    }

    public afterRead(customerList: Customers): BaseControllerResponse {
        const result = this.service.afterRead(customerList);
        if (result.isLeft()) {
            return this.error(result.value.code, result.value.message);
        }
        return this.success(result.value);
    }
}
