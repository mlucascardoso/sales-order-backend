import { SalesReportRepositoryImpl } from '@/repositories/sales-report/implementation';
import { SalesReportService } from '@/services/sales-report/protocols';
import { SalesReportServiceImpl } from '@/services/sales-report/implementation';

const makeSalesReportService = (): SalesReportService => {
    const repository = new SalesReportRepositoryImpl();
    return new SalesReportServiceImpl(repository);
};

export const salesReportService = makeSalesReportService();
