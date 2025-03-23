/* eslint-disable @typescript-eslint/no-unused-vars */
import { SalesReportModel } from '@/models/sales-report';
import { SalesReportRepository } from '@/repositories/sales-report/protocols';

export class SalesReportRepositoryStub implements SalesReportRepository {
    public async findByCustomerId(customerId: string): Promise<SalesReportModel[] | null> {
        const salesOrderId = crypto.randomUUID();
        return [
            SalesReportModel.with({
                salesOrderId,
                salesOrderTotalAmount: 100,
                customerId,
                customerFullName: 'Moovi'
            })
        ];
    }

    public async findByDays(days?: number): Promise<SalesReportModel[] | null> {
        const salesOrderId = crypto.randomUUID();
        const customerId = crypto.randomUUID();
        return [
            SalesReportModel.with({
                salesOrderId,
                salesOrderTotalAmount: 100,
                customerId,
                customerFullName: 'Moovi'
            })
        ];
    }
}
