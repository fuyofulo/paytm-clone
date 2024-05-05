const express = require('express');
const app = express();

// main router (named as rootRouter in BE index.js)
const router = express.Router();

// importing userRouter and giving it a default route /user to direct all user requests
const userRouter = require('/user')
router.use('/user', userRouter);

module.exports = { router };