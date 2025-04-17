import { BaseControllerResponse } from '@/controllers/base';

export interface SalesReportController {
    findByDays(days: number): Promise<BaseControllerResponse>;
    findByCustomerId(customerId: string): Promise<BaseControllerResponse>;
    exportByDays(days: number): Promise<BaseControllerResponse>;
}
