/* eslint-disable max-lines-per-function */
import { api } from '@tests/e2e/config/api';

describe('ExportSalesReportByDays route', () => {
    it('should return 404 if no records were found', async () => {
        await expect(api.get('/sales-order/exportSalesReportByDays()')).rejects.toThrow(
            'Nenhum dado encontrado para os parâmetros informados'
        );
    });

    it('should return Excel file with status 200 if everything worked as expected', async () => {
        const { data, status, headers } = await api.get('/sales-order/exportSalesReportByDays(days=14)', {
            responseType: 'arraybuffer'
        });

        // Verifica se o status da resposta é 200
        expect(status).toBe(200);

        // Verifica os cabeçalhos HTTP da resposta
        expect(headers['content-type']).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        expect(headers['content-disposition']).toMatch(
            /attachment; filename="relatorio-vendas-14-dias-\d{2}-\d{2}-\d{4}\.xlsx"/
        );
        expect(headers['cache-control']).toBe('max-age=0');

        // Verifica se os dados são um Buffer válido
        const buffer = Buffer.from(data);
        expect(buffer.length).toBeGreaterThan(100);

        // Verifica a assinatura do arquivo XLSX (começa com PK)
        expect(buffer[0]).toBe(0x50); // P
        expect(buffer[1]).toBe(0x4b); // K
    });
});
