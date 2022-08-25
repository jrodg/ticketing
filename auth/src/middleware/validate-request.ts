import { NextFunction, Request, Response }from 'express';
import { validationResult } from "express-validator";
import { RequestValitationError } from "../errors/request-valitaion-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValitationError(errors.array());
     }
     next()
}