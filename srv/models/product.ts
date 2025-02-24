import { Product } from '@models/sales';

export class ProductModel {
    constructor(private readonly props: Product) {}

    public static with(
        id: Product['id'],
        name: Product['name'],
        price: Product['price'],
        stock: Product['stock']
    ) {
        return new ProductModel({ id, name, price, stock });
    }
    
    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get price() {
        return this.props.price;
    }

    public get stock() {
        return this.props.stock;
    }

    public sell(amount: number) {
        const stock = this.props.stock as number
        if (stock < amount) {
            throw new Error("O saldo do produto não é suficiente para a venda.");
        }
        (this.props.stock as number) -= amount;
    }
}