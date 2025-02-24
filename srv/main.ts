import cds, { Request, Service } from '@sap/cds';
import { Customers } from '@models/sales';

export default (service: Service) => {
    service.after('READ', 'Customers', (results: Customers) => {
        results.forEach(customer => {
            if (!customer.email?.includes('@')) {
                customer.email = `${customer.email}@gmail.com`;
            }
        })
    });
    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const params = request.data;
        if (!params.customer_id) {
            return request.reject(400, 'Customer inválido');
        }
        if (!params.items || params.items?.length === 0) {
            return request.reject(400, 'Itens inválidos');
        }
        const customerQuery = SELECT.one.from('sales.Customers').where({ id: params.customer_id });
        const customer = await cds.run(customerQuery);
        if (!customer) {
            return request.reject(404, 'Customer não encontrado');
        }
    });
}
