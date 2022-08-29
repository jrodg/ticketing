import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import cookieSession = require("cookie-session") ;

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.get('*',async (req,res) => {
  throw new Error("");
  
})

app.use(errorHandler)

export {app}