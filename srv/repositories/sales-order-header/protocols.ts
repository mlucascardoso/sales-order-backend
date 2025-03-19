import { SalesOrderHeaderModel } from '@/models/sales-order-header';

export interface SalesOrderHeaderRepository {
    bulkCreate(headers: SalesOrderHeaderModel[]): Promise<void>;
}
