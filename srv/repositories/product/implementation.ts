import cds from "@sap/cds";

import { Products } from "@models/sales";
import { ProductModel } from "../../models/product";
import { ProductRepository } from "./protocols";

export class ProductRepositoryImpl implements ProductRepository {
    public async findManyByIds(ids: string[]): Promise<ProductModel[]> {
        const query = SELECT.from('sales.Products').where({ id: ids });
        const products: Products = await cds.run(query);
        return products.map(p => {
            const { id, name, price, stock } = p;
            return ProductModel.with(id, name, price, stock);
        })
    }
}