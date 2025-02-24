import { SalesOrderHeader, SalesOrderItems } from "@models/sales";

export class SalesOrderHeaderModel {
    constructor(private readonly props: SalesOrderHeader) {}

    public get id() {
        return this.props.id;
    }

    public get customerId() {
        return this.props.customer_id as string;
    }

    public get totalAmount(): number {
        return this.props.totalAmount as number;
    }

    public get items() {
        return this.props.items as SalesOrderItems;
    }

    public validate(): { isValid: boolean, errorInstance?: Error } {
        if (!this.props.customer_id) {
            return { isValid: false, errorInstance: new Error('Customer inválido') };
        }
        if (!this.props.items || this.props.items?.length === 0) {
            return { isValid: false, errorInstance: new Error('Itens inválidos') };
        }
        return { isValid: true };
    }

    public calculateTotalAmount(): void {
        let totalAmount = 0;
        this.props.items?.forEach(item => {
            totalAmount += (item.price as number) * (item.quantity as number);
        });
        this.props.totalAmount = totalAmount;
    }

    public applyDiscount() {
        const totalAmount = this.props.totalAmount as number;
        if ((this.props.totalAmount as number) > 30000) {
            const discount = totalAmount * (10/100);
            this.props.totalAmount = totalAmount - discount;
        }
    }
}
