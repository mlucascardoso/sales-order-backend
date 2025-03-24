import { api } from '@tests/e2e/config/api';

describe('GetSalesReportByDays route', () => {
    it('should return 404 if no records were found', async () => {
        await expect(api.get('/sales-order/getSalesReportByDays()')).rejects.toThrow(
            'Nenhum dado encontrado para os parâmetros informados'
        );
    });
    it('should return report data with status 200 if everything worked as expected', async () => {
        const { data, status } = await api.get('/sales-order/getSalesReportByDays(days=14)');
        const { value: report } = data;
        expect(status).toBe(200);
        expect(report).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    salesOrderId: '15196739-2936-4d66-b85c-283f5ae8ec03',
                    salesOrderTotalAmount: 14162892.11,
                    customerId: '27831255-9abb-4c2f-80a8-287902446abb',
                    customerFullName: 'firstName1 lastName-27831255'
                })
            ])
        );
    });
});
