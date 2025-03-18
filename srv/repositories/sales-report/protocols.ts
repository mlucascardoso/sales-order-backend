import { SalesReportModel } from '@/models/sales-report';

export interface SalesReportRepository {
    findByDays(days: number): Promise<SalesReportModel[] | null>;
}
