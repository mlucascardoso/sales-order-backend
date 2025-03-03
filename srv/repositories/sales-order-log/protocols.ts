import { SalesOrderLogModel } from "srv/models/sales-order-log";

export interface SalesOrderLogRepository {
    create(logs: SalesOrderLogModel[]): Promise<void>;
}
