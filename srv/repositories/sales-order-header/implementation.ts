import cds from '@sap/cds';

import { ProductModel } from '@/models/product';
import { SalesOrderHeaderModel } from '@/models/sales-order-header';
import { SalesOrderItemModel } from '@/models/sales-order-item';
import { CompleteSalesOrderHeader, SalesOrderHeaderRepository } from '@/repositories/sales-order-header/protocols';

export class SalesOrderHeaderRepositoryImpl implements SalesOrderHeaderRepository {
    public async bulkCreate(headers: SalesOrderHeaderModel[]): Promise<void> {
        const headerObjects = headers.map((header) => header.toCreationObject());
        await cds.create('sales.SalesOrderHeaders').entries(headerObjects);
    }

    public async findCompleteSalesOrderById(id: string): Promise<SalesOrderHeaderModel | null> {
        const sql = SELECT.from('sales.SalesOrderHeaders')
            .columns(
                'totalAmount',
                'customer.id as customerId',
                'items.quantity as item_quantity',
                'items.price  as item_price',
                'items.product.id as product_id',
                'items.product.name as product_name',
                'items.product.price as product_price',
                'items.product.stock as product_stock'
            )
            .where({ id });
        const headers: CompleteSalesOrderHeader[] = await cds.run(sql);
        if (!headers || headers.length === 0) {
            return null;
        }
        const products = this.mapProductsToCompleteSalesOrder(headers);
        const items = this.mapItemsToCompleteSalesOrder(headers, products);
        return SalesOrderHeaderModel.create({
            customerId: headers.at(0)?.customerId as string,
            items
        });
    }

    private mapProductsToCompleteSalesOrder(headers: CompleteSalesOrderHeader[]): ProductModel[] {
        return headers.map((header) =>
            ProductModel.with({
                id: header.product_id,
                name: header.product_name,
                price: header.product_price,
                stock: header.product_stock
            })
        );
    }

    private mapItemsToCompleteSalesOrder(
        headers: CompleteSalesOrderHeader[],
        products: ProductModel[]
    ): SalesOrderItemModel[] {
        return headers.map((header) =>
            SalesOrderItemModel.create({
                price: header.item_price,
                quantity: header.item_quantity,
                productId: header.product_id,
                products
            })
        );
    }
}
