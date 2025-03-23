/* eslint-disable @typescript-eslint/no-unused-vars */
import { SalesReportModel } from '@/models/sales-report';
import { SalesReportRepository } from '@/repositories/sales-report';

export class SalesReportRepositoryStub implements SalesReportRepository {
    public async findByCustomerId(customerId: string): Promise<SalesReportModel[] | null> {
        const salesOrderId = crypto.randomUUID();
        const result: SalesReportModel[] = [
            SalesReportModel.with({
                salesOrderId,
                salesOrderTotalAmount: 5,
                customerId,
                customerFullName: 'Valid Customer'
            })
        ];
        return result;
    }

    public async findByDays(days: number): Promise<SalesReportModel[] | null> {
        const salesOrderId = crypto.randomUUID();
        const customerId = crypto.randomUUID();
        const result: SalesReportModel[] = [
            SalesReportModel.with({
                salesOrderId,
                salesOrderTotalAmount: 100,
                customerId,
                customerFullName: 'Valid Customer'
            })
        ];
        return result;
    }
}
