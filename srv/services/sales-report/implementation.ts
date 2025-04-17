import { Either, left, right } from '@sweet-monads/either';
import Excel from 'exceljs';

import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

import { AbstractError, NotFoundError, ServerError } from '@/errors';
import { SalesReportModel } from '@/models/sales-report';
import { SalesReportRepository } from '@/repositories/sales-report/protocols';
import { SalesReportService } from '@/services/sales-report/protocols';

export class SalesReportServiceImpl implements SalesReportService {
    constructor(private readonly repository: SalesReportRepository) {}

    public async findByDays(days = 7): Promise<Either<AbstractError, SalesReportByDays[]>> {
        try {
            const reportData = await this.repository.findByDays(days);
            if (!reportData) {
                const stack = new Error().stack as string;
                return left(new NotFoundError('Nenhum dado encontrado para os parâmetros informados', stack));
            }
            const mappedData = reportData.map((r) => r.toObject());
            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }

    public async findByCustomerId(customerId: string): Promise<Either<AbstractError, SalesReportByDays[]>> {
        try {
            const reportData = await this.repository.findByCustomerId(customerId);
            if (!reportData) {
                const stack = new Error().stack as string;
                return left(new NotFoundError('Nenhum dado encontrado para os parâmetros informados', stack));
            }
            const mappedData = reportData.map((r) => r.toObject());
            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }

    public async exportByDays(days = 7): Promise<Either<AbstractError, Buffer>> {
        try {
            const reportData = await this.repository.findByDays(days);
            if (!reportData) {
                const stack = new Error().stack as string;
                return left(new NotFoundError('Nenhum dado encontrado para os parâmetros informados', stack));
            }

            // Criando uma cópia dos dados para evitar mutação (imutabilidade)
            const reportItems = [...reportData.map((r) => ({ ...r.toObject() }))];

            const excelBuffer = await this.generateExcelReport(reportItems);
            return right(excelBuffer);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }

    private async generateExcelReport(reportData: ReturnType<SalesReportModel['toObject']>[]): Promise<Buffer> {
        // Criando o workbook e a planilha
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Relatório de Vendas');

        // Definindo as colunas com formatação
        worksheet.columns = [
            { header: 'ID Pedido', key: 'salesOrderId', width: 36 },
            { header: 'Valor Total', key: 'salesOrderTotalAmount', width: 15, style: { numFmt: '"R$ "#,##0.00' } },
            { header: 'ID Cliente', key: 'customerId', width: 36 },
            { header: 'Nome do Cliente', key: 'customerFullName', width: 30 }
        ];

        // Formatando cabeçalho em negrito
        worksheet.getRow(1).font = { bold: true };

        // Adicionando os dados
        worksheet.addRows(reportData);

        // Formatando linhas alternadas para facilitar leitura
        this.formatWorksheetRows(worksheet);

        // Gerando o buffer
        return workbook.xlsx.writeBuffer();
    }

    private formatWorksheetRows(worksheet: Excel.Worksheet): void {
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber > 1 && rowNumber % 2 === 0) {
                row.eachCell({ includeEmpty: false }, (cell) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'F5F5F5' }
                    };
                });
            }
        });
    }
}
