> [!TIP]
> ✅ Implementação concluída

# 🧭 Overview

Implementação da funcionalidade de exportação de relatório de vendas em formato Excel, permitindo que os usuários baixem os dados para análise offline.

### ✅ Definition of Done

- [x] Implementação da rota REST para exportação do relatório
- [x] Configuração correta dos headers para download do arquivo
- [x] Formatação adequada do arquivo Excel (cabeçalhos em negrito, valores monetários)
- [x] Testes unitários implementados
- [x] Testes end-to-end implementados

## 🧪 Test Script

1. Acesse a aplicação e navegue até o relatório de vendas
2. Clique no botão de exportação para Excel
3. Verifique se o download do arquivo é iniciado automaticamente
4. Abra o arquivo Excel baixado e confirme que os dados estão corretos e formatados adequadamente

## 🗃 Test Data

A API pode ser testada com a seguinte URL:
```
GET /sales-order/exportSalesReportByDays(days=7)
```

O resultado será um download de arquivo Excel contendo os dados do relatório de vendas dos últimos 7 dias.