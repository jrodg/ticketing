import  express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator'


const router = express.Router();

router.get('api/users/signup', [
    body('email')
    .isEmail()
    .withMessage('Email most be valid'),
    body('password')
    .trim()
    .isLength({ min: 4, max: 18})
    .withMessage('Enter correct password')
], 
(req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array())
    }
    const {email, password} = req.body

    console.log('Creating user .....')

    res.send({})
})

export {router as signupRouter}