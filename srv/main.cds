using { sales } from '../db/schema';

service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
}
