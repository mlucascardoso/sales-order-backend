import { SalesReportController } from '@/controllers/sales-report/protocols';
import { SalesReportControllerImpl } from '@/controllers/sales-report/implementation';
import { salesReportService } from '@/factories/services/sales-report';

const makeSalesReportController = (): SalesReportController => {
    return new SalesReportControllerImpl(salesReportService);
};

export const salesReportController = makeSalesReportController();
