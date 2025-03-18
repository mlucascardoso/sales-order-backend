using { sales } from '../schema';

namespace db.types.SalesReport;

type Params {
    days: Integer;
}

type ExpectedResult {
    salesOrderId: sales.SalesOrderHeaders:id;
    salesOrderTotalAmount: sales.SalesOrderHeaders:totalAmount;
    customerId: sales.Customers:id;
    customerFullName: String(120);
};