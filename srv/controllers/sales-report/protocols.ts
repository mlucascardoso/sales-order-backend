import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

import { BaseControllerResponse } from '@/controllers/base';

export interface SalesReportController {
    findByDays(days: number): Promise<BaseControllerResponse>;
    findByCustomerId(customerId: string): Promise<SalesReportByDays[]>;
}
