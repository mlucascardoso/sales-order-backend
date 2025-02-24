using { sales } from '../db/schema';

@requires: 'authenticated-user'
service MainService {
    @restrict: [
        {
            grant: 'READ',
            to: 'read_only_user'
        },
        {
            grant: ['READ', 'WRITE'],
            to: 'admin'
        }
    ]
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    @restrict: [
        {
            grant: 'READ',
            to: 'read_only_user'
        },
        {
            grant: ['READ', 'WRITE'],
            to: 'admin'
        }
    ]
    entity Customers as projection on sales.Customers;
    @restrict: [
        {
            grant: 'READ',
            to: 'read_only_user'
        },
        {
            grant: ['READ', 'WRITE'],
            to: 'admin'
        }
    ]
    entity Products as projection on sales.Products;
}
