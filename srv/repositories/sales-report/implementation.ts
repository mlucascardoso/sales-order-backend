import cds from '@sap/cds';

import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

import { SalesReportModel } from '@/models/sales-report';
import { SalesReportRepository } from '@/repositories/sales-report/protocols';

export class SalesReportRepositoryImpl implements SalesReportRepository {
    public async findByDays(days: number): Promise<SalesReportModel[] | null> {
        const today = new Date().toISOString();
        const subtractedDays = new Date();
        subtractedDays.setDate(subtractedDays.getDate() - days);
        const subtractedDaysISOString = subtractedDays.toISOString();

        const sql = this.getReportBaseSql().where({ createdAt: { between: subtractedDaysISOString, and: today } });
        const salesReports = await cds.run(sql);
        return this.mapReportResult(salesReports);
    }

    public async findByCustomerId(customerId: string): Promise<SalesReportModel[] | null> {
        const sql = this.getReportBaseSql().where({ customer_id: customerId });
        const salesReports = await cds.run(sql);
        return this.mapReportResult(salesReports);
    }

    private getReportBaseSql(): cds.ql.SELECT<unknown, unknown> {
        return SELECT.from('sales.SalesOrderHeaders').columns(
            'id as salesOrderId',
            'totalAmount as salesOrderTotalAmount',
            'customer.id as customerId',
            // eslint-disable-next-line quotes
            `customer.firstName || ' ' || customer.lastName as customerFullName`
        );
    }

    private mapReportResult(salesReports: SalesReportByDays[]): SalesReportModel[] | null {
        if (salesReports.length === 0) {
            return null;
        }
        return salesReports.map((salesReport: SalesReportByDays) =>
            SalesReportModel.with({
                salesOrderId: salesReport.salesOrderId as string,
                salesOrderTotalAmount: salesReport.salesOrderTotalAmount as number,
                customerId: salesReport.customerId as string,
                customerFullName: salesReport.customerFullName as string
            })
        );
    }
}
