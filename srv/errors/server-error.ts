import { AbstractError } from '@/errors/abstract';

export class ServerError extends AbstractError {
    constructor(stack: string, message = 'internalServerError') {
        super(message, 500, stack);
    }

    public get message(): string {
        return this.message;
    }
}
