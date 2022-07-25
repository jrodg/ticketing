import express, {Request, Response} from "express";
import { body, validationResult} from "express-validator";
const router = express.Router()

router.post('/api/users/signup', [ 
    body('email')
        .isEmail()
        .withMessage("Email most be valid"),
    body('password')
        .trim()
        .isLength({min: 4, max: 15})
        .withMessage("The length should be between 4 and 15")
], (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new Error("Invalid email or password")
    }
    const {email, password} = req.body
})

export {router as signupRouter}