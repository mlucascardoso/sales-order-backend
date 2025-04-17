# Implementação: Exportação de Relatório em Excel

## Requisito

Crie uma nova rota REST que permita a exportação do relatório de vendas por período em formato Excel (XLSX). A funcionalidade deve reutilizar a lógica da rota existente de relatório de vendas, mantendo os mesmos campos e filtros.

## Características Técnicas

- **Biblioteca**: Utilize `exceljs` para geração do arquivo Excel
- **Formato da Resposta**: Arquivo `.xlsx` com header `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **Download**: Configure como download de arquivo com `Content-Disposition: attachment`
- **Segurança**: Implemente verificação de autorização para a nova rota REST
- **Arquitetura**: Siga o padrão de múltiplas camadas (rotas, controllers, services)
- **Imutabilidade**: Garanta que não haja mutação de dados entre camadas

## Etapas Específicas

1. **Definição da Rota**:
   - Crie uma função em `srv/routes/main.cds`: `exportSalesReportByDays(days: SalesReport.Params:days)`
   - Adicione a função na rota em `srv/routes/main.ts` com tratamento adequado para stream de download

2. **Controller**:
   - Adicione o método `exportByDays` na interface `SalesReportController`
   - Implemente o método no `SalesReportControllerImpl` para orquestrar a chamada ao serviço

3. **Service**:
   - Adicione o método `exportByDays` na interface `SalesReportService`
   - Implemente o método no `SalesReportServiceImpl` para:
     - Reutilizar a lógica de busca do relatório
     - Evitar mutação de dados usando cópia de arrays
     - Criar workbook Excel com colunas formatadas (cabeçalho em negrito, formato monetário)
     - Gerar buffer do arquivo Excel com nome padronizado (incluindo data)

4. **Testes**:
   - Crie testes unitários para o serviço de exportação verificando casos de sucesso e erro
   - Crie testes e2e para a rota de exportação verificando código de status, headers e conteúdo do arquivo

## Cuidados Especiais

- Certifique-se que o buffer seja enviado corretamente como dados binários, usando `res.end(buffer)` em vez de retornar diretamente
- Configure os headers HTTP adequadamente para download de arquivos
- Adicione `Cache-Control: max-age=0` para evitar caching do arquivo
- Garanta que o tratamento de erros seja consistente com o resto da aplicação
- Verifique a integridade do arquivo Excel gerado (os primeiros bytes devem ser 504b - assinatura de arquivo XLSX)

## Bibliotecas Necessárias

- `exceljs` para geração do Excel
- `date-fns` para formatação de datas no nome do arquivo

## Exemplo de Utilização

A rota poderá ser consumida via:
```
GET /sales-order/exportSalesReportByDays(days=7)
```

O resultado será um download de arquivo Excel contendo os dados do relatório de vendas dos últimos 7 dias.

## Implementação de Referência

### Rota CDS
```cds
extend service MainService with {
    @readonly
    function exportSalesReportByDays(days: SalesReport.Params:days) returns String;
}
```

### Controller
```typescript
public async exportByDays(days: number): Promise<BaseControllerResponse> {
    const result = await this.service.exportByDays(days);
    if (result.isLeft()) {
        return this.error(result.value.code, result.value.message);
    }
    return this.success(result.value);
}
```

### Serviço
```typescript
public async exportByDays(days = 7): Promise<Either<AbstractError, { data: Buffer; filename: string }>> {
    try {
        const reportResult = await this.findByDays(days);

        if (reportResult.isLeft()) {
            return left(reportResult.value);
        }

        const reportData = [...reportResult.value]; // Criação de uma cópia para evitar mutação
        const excelData = await this.generateExcelWorkbook(reportData, days);

        return right(excelData);
    } catch (error) {
        const errorInstance = error as Error;
        return left(new ServerError(errorInstance.stack as string, errorInstance.message));
    }
}
```

### Rota
```typescript
service.on('exportSalesReportByDays', async (request: Request) => {
    const days = request.data?.days || 7;
    const result = await salesReportController.exportByDays(days);
    if (result.status >= 400) {
        return request.error(result.status, result.data as string);
    }

    const { data: excelBuffer, filename } = result.data as { data: Buffer; filename: string };
    
    // Define resposta como binária para evitar conversão de texto
    request._.res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${filename}`,
        'Content-Length': excelBuffer.length,
        'Cache-Control': 'max-age=0'
    });

    // Envia o buffer diretamente para o response
    request._.res.end(excelBuffer);
    
    // Retorna null para indicar que a resposta já foi tratada
    return null;
});
``` 