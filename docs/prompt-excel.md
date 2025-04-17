### 🧪 Prompt de Exemplo para Criação de Funcionalidades

> **Cenário:** Criação de uma nova rota REST para exportação de relatório de vendas em Excel.
>
> **Prompt sugerido:**
>
> Com base na arquitetura do projeto `sales-order-backend`, crie uma nova rota REST que permita a **extração do relatório de vendas por período em formato Excel**.
>
> **Requisitos:**
> - A nova rota deve reutilizar a lógica da rota original de relatório de vendas, mantendo os **mesmos campos e filtros**.
> - A resposta deve ser um arquivo `.xlsx` gerado com a biblioteca `exceljs`.
> - O código da rota deve ser criado em `/srv`, seguindo a estrutura de `routes`, `controllers`, `services` e `models`.
> - Evite mutabilidade e passagem de dados por referência.
> - Crie testes:
>   - **Unitários**, localizados em `/test/unit`
>   - **End-to-end**, localizados em `/test/e2e`
>   - Utilize `/test/e2e/config/api.ts` para consumir a rota de exportação no teste.
> - A rota deve ser protegida por verificação básica de autorização, se aplicável.
>
> Siga os padrões definidos no projeto para controllers e serviços:
> - A **controller** deve apenas orquestrar a requisição.
> - A **service** deve conter a lógica de extração e geração do Excel.
> - Use o padrão de retorno com stream de download e content-type `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

