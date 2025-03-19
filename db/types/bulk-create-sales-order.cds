using { sales } from '../schema';

namespace db.types.BulkCreateSalesOrder;

type Payload {
    id: sales.SalesOrderHeaders:id;
    customer_id: sales.Customers:id;
    totalAmount: sales.SalesOrderHeaders:totalAmount;
    items: array of ItemsPayload;
}

type ItemsPayload {
    id: sales.SalesOrderItems:id;
    header_id: sales.SalesOrderHeaders:id;
    product_id: sales.Products:id;
    quantity: sales.SalesOrderItems:quantity;
    price: sales.SalesOrderItems:price;
}

type ExpectedResult {
    success: Boolean;
}
