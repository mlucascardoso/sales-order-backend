using { managed } from '@sap/cds/common';

namespace sales;

entity SalesOrderHeaders: managed {
    key id: UUID;
        customer: Association to Customers;
        totalAmount: Decimal(15,2);
        items: Composition of many SalesOrderItems on items.header = $self;
}

entity SalesOrderItems {
    key id: UUID;
        header: Association to SalesOrderHeaders;
        product: Association to Products;
        quantity: Integer;
        price: Decimal(15,2);
}

entity SalesOrderLogs: managed {
    key id: UUID;
        header: Association to SalesOrderHeaders;
        userData: LargeString;
        orderData: LargeString;
}

entity Customers {
    key id: UUID;
        firstName: String(20);
        lastName: String(100);
        email: String(255);
}

entity Products {
    key id: UUID;
        name: String(255);
        price: Decimal(15,2);
        stock: Integer;
}
