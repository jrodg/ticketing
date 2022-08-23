import  express from 'express';

const router = express.Router();

router.get('api/users/currentusers', (req, res)=>{
    res.send('Hello!')
})

export {router as currentUserRouter}