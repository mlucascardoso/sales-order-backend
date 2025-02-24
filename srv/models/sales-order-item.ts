export type SalesOrderItemProps = {
    id: string;
    productId: string;
    quantity: number;
    price: number;
};

export class SalesOrderItemModel {
    constructor(private readonly props: SalesOrderItemProps) {}

    public static create(productId: string, price: number, quantity: number) {
        return new SalesOrderItemModel({
            id: crypto.randomUUID(),
            productId,
            price,
            quantity
        });
    }

    public get id() {
        return this.props.id;
    }

    public get productId() {
        return this.props.productId as string;
    }

    public get quantity(): number {
        return this.props.quantity as number;
    }
}
