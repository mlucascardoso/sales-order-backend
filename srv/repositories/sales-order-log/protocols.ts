import { SalesOrderLogModel } from '@/models/sales-order-log';

export interface SalesOrderLogRepository {
    create(logs: SalesOrderLogModel[]): Promise<void>;
}
