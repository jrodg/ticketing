import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValitationError extends CustomError{
   statuscode = 400
 constructor(public errors:ValidationError[]) {
    super()
    Object.setPrototypeOf(this, RequestValitationError.prototype)
 }
 serializeErrors(){
    return this.errors.map(err => {
            return {message: err.msg, field: err.param}
        })
    
 }
}