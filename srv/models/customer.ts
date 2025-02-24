import { Customer } from '@models/sales';

export class CustomerModel {
    constructor(private readonly props: Customer) {}

    public static with(
        id: Customer['id'],
        firstName: Customer['firstName'],
        lastName: Customer['lastName'],
        email: Customer['email']
    ) {
        return new CustomerModel({ id, firstName, lastName, email });
    }

    public get id() {
        return this.props.id;
    }

    public get firstName() {
        return this.props.firstName;
    }

    public get lastName() {
        return this.props.lastName;
    }

    public get email() {
        return this.props.email;
    }

    public getFullName() {
        return `${this.props.firstName} ${this.props.lastName}`;
    }
}