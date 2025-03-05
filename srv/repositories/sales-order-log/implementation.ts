import cds from '@sap/cds';

import { SalesOrderLogModel } from '@/models/sales-order-log';
import { SalesOrderLogRepository } from '@/repositories/sales-order-log/protocols';

export class SalesOrderLogRepositoryImpl implements SalesOrderLogRepository {
    public async create(logs: SalesOrderLogModel[]): Promise<void> {
        const logsObjects = logs.map((log) => log.toObject());
        await cds.create('sales.SalesOrderLogs').entries(logsObjects);
    }
}
