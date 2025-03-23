export class AbstractError extends Error {
    public code: number;

    constructor(message: string, errorCode: number, stack: string) {
        super(message);
        this.code = errorCode;
        this.message = message;
        this.stack = stack;
    }
}
