import { SalesOrderHeaders, SalesOrderItems } from "@models/sales";
import { ProductRepository } from "srv/repositories/product/protocols";

export class SalesOrderHeaderServiceImpl {
    constructor(private readonly productRepository: ProductRepository) {}

    public async afterRead(headers: SalesOrderHeaders) {
        const headersAsArray = Array.isArray(headers) ? headers : [headers] as SalesOrderHeaders;
        for (const header of headersAsArray) {
            const items = header.items as SalesOrderItems;
            const productsIds = items.map(item => item.product_id as string);
            const products = await this.productRepository.findManyByIds(productsIds);
        }
    }
}