import { CustomerRepositoryImpl } from '@/repositories/customer/implementation';
import { ProductRepositoryImpl } from '@/repositories/product/implementation';
import { SalesOrderHeaderRepositoryImpl } from '@/repositories/sales-order-header/implementation';
import { SalesOrderHeaderService } from '@/services/sales-order-header/protocols';
import { SalesOrderHeaderServiceImpl } from '@/services/sales-order-header/implementation';
import { SalesOrderLogRepositoryImpl } from '@/repositories/sales-order-log/implementation';

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const salesOrderHeaderRepository = new SalesOrderHeaderRepositoryImpl();
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    const salesOrderLogRepository = new SalesOrderLogRepositoryImpl();
    return new SalesOrderHeaderServiceImpl(
        salesOrderHeaderRepository,
        customerRepository,
        productRepository,
        salesOrderLogRepository
    );
};

export const salesOrderHeaderService = makeSalesOrderHeaderService();
