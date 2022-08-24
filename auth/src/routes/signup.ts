import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DataBaseValitationError } from "../errors/database-connection-error";
import { RequestValitationError } from "../errors/request-valitaion-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValitationError(errors.array())
      
    }
    const { email, password } = req.body;

    console.log("Creating a user...");

    throw new DataBaseValitationError(errors.array());
    

    res.send({});

    // new User({ email, password })
  }
);

export { router as signupRouter };
