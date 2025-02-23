import { Service } from '@sap/cds';
import { Customers } from '@models/sales';

export default (service: Service) => {
    service.after('READ', 'Customers', (results: Customers) => {
        results.forEach(customer => {
            if (!customer.email?.includes('@')) {
                customer.email = `${customer.email}@gmail.com`;
            }
        })
    });
}
