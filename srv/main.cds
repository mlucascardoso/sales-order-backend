using { sales } from '../db/schema';

service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    entity Customers as projection on sales.Customers;
    entity Products as projection on sales.Products;
}
