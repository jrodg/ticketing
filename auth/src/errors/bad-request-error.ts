import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statuscode = 400;
   
    constructor(public message: string) {
        super()
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors(){
        return [{message: this.message}]
    }
}