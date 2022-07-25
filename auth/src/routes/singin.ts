import express from "express";

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
res.send("Yo sup")
})

export {router as signinRouter}