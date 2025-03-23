import { describe, expect, it, vi } from 'vitest';

import { SalesReportRepository } from '@/repositories/sales-report';
import { SalesReportService, SalesReportServiceImpl } from '@/services/sales-report';

import { SalesReportRepositoryStub } from '@tests/unit/services/sales-report/stubs';

type SutTypes = {
    sut: SalesReportService;
    salesReportRepository: SalesReportRepository;
};

const makeSut = (): SutTypes => {
    const salesReportRepository = new SalesReportRepositoryStub();
    return {
        sut: new SalesReportServiceImpl(salesReportRepository),
        salesReportRepository
    };
};

describe('SalesReportServiceImpl test cases', () => {
    it('should return an empty array if no SalesReport entries were found', async () => {
        const { sut, salesReportRepository } = makeSut();
        vi.spyOn(salesReportRepository, 'findByDays').mockReturnValueOnce(Promise.resolve(null));

        const result = await sut.findByDays();
        const expectResult = [];
        expect(result).toEqual(expectResult);
    });
});
