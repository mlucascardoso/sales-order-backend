type SalesOrderLogProps = {
    id: string;
    headerId: string;
    userData: string;
    orderData: string;
};

type SalesOrderLogWithoutIdProps = Omit<SalesOrderLogProps, 'id'>;

type SalesOrderLogDbProps = Omit<SalesOrderLogProps, 'headerId'> & {
    header_id: string;
};

export class SalesOrderLogModel {
    constructor(private props: SalesOrderLogProps) {}

    public static create(props: SalesOrderLogWithoutIdProps): SalesOrderLogModel {
        return new SalesOrderLogModel({
            ...props,
            id: crypto.randomUUID()
        });
    }

    public get id() {
        return this.props.id;
    }

    public get headerId() {
        return this.props.headerId;
    }

    public get userData() {
        return this.props.userData;
    }

    public get orderData() {
        return this.props.orderData;
    }

    public toObject(): SalesOrderLogDbProps {
        return {
            id: this.id,
            header_id: this.headerId,
            userData: this.userData,
            orderData: this.orderData
        };
    }
}
