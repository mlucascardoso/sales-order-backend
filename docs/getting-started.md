# Guia de Início Rápido

Este guia contém instruções para configuração, instalação e execução do sistema de pedidos de vendas.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Yarn (recomendado) ou NPM
- Para desenvolvimento local: SQLite
- Para implantação: Acesso ao SAP Business Technology Platform (BTP)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd sales-order-backend
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Configure as variáveis de ambiente (se necessário).

## Execução

### Ambiente de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com recarga automática:

```bash
yarn dev
```

O servidor estará disponível em `http://localhost:4004` por padrão.

### Testes

Para executar os testes unitários:

```bash
yarn test:unit
```

Para executar os testes com cobertura:

```bash
yarn test:coverage
```

Para executar os testes end-to-end:

```bash
yarn test:e2e
```

### Linting

Para verificar a qualidade do código:

```bash
yarn lint
```

## Compilação e Implantação

### Construir o pacote MTA

```bash
yarn build
```

Isso criará um arquivo `.mtar` na pasta `mta_archives`.

### Implantar no SAP BTP

```bash
yarn deploy
```

Ou para executar a limpeza, construção e implantação em um único comando:

```bash
yarn bd
```

## Estrutura do Projeto

```
sales-order-backend/
├── app-router/        # Configuração do roteador de aplicação
├── db/                # Modelos de domínio e dados
│   ├── schema.cds     # Definição do esquema de dados
│   └── src/           # Código fonte específico do banco de dados
├── srv/               # Modelos de serviço e código
│   ├── controllers/   # Controladores de aplicação
│   ├── errors/        # Definições de erros personalizados
│   ├── models/        # Modelos de negócio
│   ├── repositories/  # Repositórios para acesso a dados
│   ├── routes/        # Definição de rotas e endpoints
│   └── services/      # Serviços de aplicação
├── test/              # Testes automatizados
│   ├── unit/          # Testes unitários
│   └── e2e/           # Testes end-to-end
├── mta.yaml           # Configuração Multi-Target Application
└── package.json       # Dependências e scripts do projeto
```

## Principais Endpoints

O serviço principal está disponível em `/sales-order` e expõe os seguintes recursos:

- **SalesOrderHeaders**: Gerenciamento de pedidos de venda
- **Customers**: Gerenciamento de clientes
- **Products**: Gerenciamento de produtos
- **SalesOrderStatuses**: Consulta de status disponíveis

### Ações Personalizadas

- **cloneSalesOrder**: Clona um pedido existente
- **bulkCreateSalesOrder**: Cria múltiplos pedidos em lote
- **getSalesReportByDays**: Obtém relatório de vendas por período
- **getSalesReportByCustomerId**: Obtém relatório de vendas por cliente

## Permissões de Usuário

O sistema implementa dois níveis de permissão:

1. **read_only_user**: Pode apenas consultar dados
2. **admin**: Pode realizar todas as operações, incluindo criação e exclusão

## Recursos Adicionais

- [Documentação do SAP CAP](https://cap.cloud.sap/docs/)
- [Especificações Técnicas](./specifications.md) 