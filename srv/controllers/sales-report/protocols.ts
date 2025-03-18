import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

export interface SalesReportController {
    findByDays(days: number): Promise<SalesReportByDays[]>;
}
