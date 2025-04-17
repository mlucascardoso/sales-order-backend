import { Either, left, right } from '@sweet-monads/either';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';

import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

import { SalesReportRepository } from '@/repositories/sales-report/protocols';
import { SalesReportService } from '@/services/sales-report/protocols';
import { AbstractError, NotFoundError, ServerError } from '@/errors';

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
            const reportResult = await this.findByDays(days);

            if (reportResult.isLeft()) {
                return left(reportResult.value);
            }

            // Criar uma cópia do array para evitar mutação
            const reportData = [...reportResult.value];

            // Gerar o buffer do Excel
            const buffer = await this.generateExcelBuffer(reportData);

            return right(buffer as Buffer);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }

    private async generateExcelBuffer(data: SalesReportByDays[]): Promise<Buffer> {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Sales Report System';
        workbook.lastModifiedBy = 'Sales Report Exporter';
        workbook.created = new Date();
        workbook.modified = new Date();

        // Criar e configurar a planilha
        const worksheet = workbook.addWorksheet(`Relatório ${format(new Date(), 'dd-MM-yyyy')}`);
        this.configureWorksheetColumns(worksheet);
        worksheet.addRows(data);

        // Aplicar formato monetário e estilo
        this.applyFormatting(worksheet);

        // Gerar buffer
        return (await workbook.xlsx.writeBuffer()) as Buffer;
    }

    private configureWorksheetColumns(worksheet: ExcelJS.Worksheet): void {
        worksheet.columns = [
            { header: 'ID do Pedido', key: 'salesOrderId', width: 36 },
            { header: 'Valor Total', key: 'salesOrderTotalAmount', width: 15 },
            { header: 'ID do Cliente', key: 'customerId', width: 36 },
            { header: 'Nome do Cliente', key: 'customerFullName', width: 30 }
        ];
    }

    private applyFormatting(worksheet: ExcelJS.Worksheet): void {
        // Formatar o header com negrito
        worksheet.getRow(1).font = { bold: true };

        // Aplicar formato monetário à coluna de valor total
        const totalAmountColumn = worksheet.getColumn('salesOrderTotalAmount');
        totalAmountColumn.numFmt = '"R$"#,##0.00';
    }
}
