import { api } from '@tests/e2e/config/api';

describe('ExportSalesReportByDays route', () => {
    it('should return 404 if no records were found', async () => {
        await expect(api.get('/sales-order/exportSalesReportByDays(days=999999)')).rejects.toThrow(
            'Nenhum dado encontrado para os parâmetros informados'
        );
    });

    it('should return Excel file with status 200 if everything worked as expected', async () => {
        const response = await api.get('/sales-order/exportSalesReportByDays(days=14)', {
            responseType: 'arraybuffer'
        });

        // Verificar status e headers da resposta
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        expect(response.headers['content-disposition']).toMatch(
            /attachment; filename=relatorio-vendas-\d{4}-\d{2}-\d{2}\.xlsx/
        );
        expect(response.headers['cache-control']).toBe('max-age=0');

        // Verificar conteúdo do buffer
        const buffer = Buffer.from(response.data);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.slice(0, 2).toString('hex').startsWith('504b')).toBeTruthy();
    });
});
