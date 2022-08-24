import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DataBaseValitationError extends CustomError{
    statuscode= 500
    reason = "Database error"
 constructor(public errors:ValidationError[]) {
    super()
    Object.setPrototypeOf(this, DataBaseValitationError.prototype)
 }
 serializeErrors(){
    return [
        {message: this.reason}
    ]
 }
}