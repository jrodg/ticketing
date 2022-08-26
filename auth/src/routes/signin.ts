import  express , { Request, Response }from 'express';
import { body } from "express-validator";
import { validateRequest } from '../middleware/validate-request';
import  jwt  from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const router = express.Router();

router.post("/api/users/signin", 
[
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password most be entered")
], 
validateRequest,
async(req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({email})

    if (!existingUser){
      throw new BadRequestError("Invalid credentials");
    }
    const pswMatch = await Password.compare(existingUser.password, password)

    if (!pswMatch) {
        throw new BadRequestError("Invalid credentials");
    }
    //Generate jwt
   
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
      }, process.env.JWT_KEY!)
  
      //Session storage
      req.session = {
        jwt: userJWT
      }
      res.status(200).send(existingUser)
})

export {router as signinRouter}