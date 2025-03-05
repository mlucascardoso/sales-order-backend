import { SalesOrderHeaderController } from 'srv/controllers/sales-order-header/protocols';
import { SalesOrderHeaderControllerImpl } from 'srv/controllers/sales-order-header/implementation';
import { salesOrderHeaderService } from '../services/sales-order-header';

const makeSalesOrderHeaderController = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImpl(salesOrderHeaderService);
};

export const salesOrderHeaderController = makeSalesOrderHeaderController();
