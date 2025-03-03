type LoggedUserProps = {
    id: string;
    roles: string[];
    attributes: LoggedUserAttributesProps;
}

type LoggedUserAttributesProps = {
    id: number;
    groups: string[];
}

export class LoggedUserModel {
    constructor(private props: LoggedUserProps) {}

    public static create(props: LoggedUserProps) {
        return new LoggedUserModel(props);
    }

    public get id() {
        return this.props.id;
    }

    public get roles() {
        return this.props.roles;
    }

    public get attributes() {
        return this.props.attributes;
    }

    public toStringifiedObject(): string {
        return JSON.stringify(this.props);
    }
}
