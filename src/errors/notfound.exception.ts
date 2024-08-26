export class NotFoundException extends Error {
    errorCode: number;
    constructor(
        public readonly message: string | any,
    ) {
        super(message);
        this.errorCode = 404;
    }
}