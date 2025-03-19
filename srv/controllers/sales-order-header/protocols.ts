import { User } from '@sap/cds';

import { Payload as BulkCreateSalesOrderPayload } from '@models/db/types/BulkCreateSalesOrder';
import { SalesOrderHeader, SalesOrderHeaders } from '@models/sales';

export type CreationPayloadValidationResult = {
    hasError: boolean;
    totalAmount?: number;
    error?: Error;
};

export interface SalesOrderHeaderController {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult>;
    afterCreate(params: SalesOrderHeaders, loggedUser: User): Promise<void>;
    bulkCreate(headers: BulkCreateSalesOrderPayload[], loggedUser: User): Promise<CreationPayloadValidationResult>;
}
