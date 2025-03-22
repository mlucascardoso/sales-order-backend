import { SalesOrderHeaderModel } from '@/models/sales-order-header';

export type CompleteSalesOrderHeader = {
    totalAmount: number;
    customerId: string;
    item_quantity: number;
    item_price: number;
    product_id: string;
    product_name: string;
    product_price: number;
    product_stock: number;
};

export interface SalesOrderHeaderRepository {
    bulkCreate(headers: SalesOrderHeaderModel[]): Promise<void>;
    findCompleteSalesOrderById(id: string): Promise<SalesOrderHeaderModel | null>;
}
