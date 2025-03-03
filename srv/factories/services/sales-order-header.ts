import { CustomerRepositoryImpl } from "srv/repositories/customer/implementation";
import { ProductRepositoryImpl } from "srv/repositories/product/implementation";
import { SalesOrderHeaderServiceImpl } from "srv/services/sales-order-header/implementation";
import { SalesOrderHeaderService } from "srv/services/sales-order-header/protocols";

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    return new SalesOrderHeaderServiceImpl(customerRepository, productRepository);
}

export const salesOrderHeaderService = makeSalesOrderHeaderService();
