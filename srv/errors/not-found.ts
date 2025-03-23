import { AbstractError } from '@/errors/abstract';

export class NotFoundError extends AbstractError {
    constructor(message: string, stack: string) {
        super(message, 404, stack);
    }

    public get message(): string {
        return this.message;
    }
}
