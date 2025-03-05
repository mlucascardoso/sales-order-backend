import { ProductModel, ProductProps } from '@/models/product';

export interface ProductRepository {
    findByIds(ids: ProductProps['id'][]): Promise<ProductModel[] | null>;
    updateStock(product: ProductModel): Promise<void>;
}
