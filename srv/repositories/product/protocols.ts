import { ProductModel } from "srv/models/product";

export interface ProductRepository {
    findManyByIds(ids: string[]): Promise<ProductModel[]>;
}
