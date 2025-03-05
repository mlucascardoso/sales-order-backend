import { ProductModel } from '@/models/product';

type SalesOrderItemProps = {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    products: ProductModel[];
};

type SalesOrderItemPropsWithoutId = Omit<SalesOrderItemProps, 'id'>;

type CreationPayload = {
    product_id: SalesOrderItemProps['productId'];
};

type CreationPayloadValidationResult = {
    hasError: boolean;
    error?: Error;
};

export class SalesOrderItemModel {
    constructor(private props: SalesOrderItemProps) {}

    public static create(props: SalesOrderItemPropsWithoutId): SalesOrderItemModel {
        return new SalesOrderItemModel({
            ...props,
            id: crypto.randomUUID()
        });
    }

    public get id() {
        return this.props.id;
    }

    public get productId() {
        return this.props.productId;
    }

    public get quantity() {
        return this.props.quantity;
    }

    public get price() {
        return this.props.price;
    }

    public get products() {
        return this.props.products;
    }

    public validateCreationPayload(params: CreationPayload): CreationPayloadValidationResult {
        const product = this.products.find((product) => product.id === params.product_id);
        if (!product) {
            return {
                hasError: true,
                error: new Error(`Produto ${params.product_id} não encontrado`)
            };
        }
        if (product.stock === 0) {
            return {
                hasError: true,
                error: new Error(`Produto ${product.name}(${product.id}) sem estoque disponível`)
            };
        }
        return {
            hasError: false
        };
    }
}
