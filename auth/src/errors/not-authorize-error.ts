import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statuscode = 401
    constructor() {
        super("Not ath")

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }
    serializeErrors() {
        return [{message:"Not Authorized"}];
    }
}