const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');

import { User } from '../db';
import { JWT_SECRET } from '../config';
import { authMiddleware } from '../middleware';
import { Account } from '../db';


const signupBody = zod.object({
    username: zod.string().email,
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string() 
})

router.post('/signup', async (req, res) => {

    const { success } = signupBody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        res.status(411).json({
            msg: "user with this email already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id;

    await Account.create({
        userId, 
        balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({ userId, JWT_SECRET });

    res.json({
        msg: "User successfully created",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post('/signin', async (req, res) => {
    
    const { success } = signinBody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            msg: "invalid credentials"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    const userId = user._id;

    if(user) {
        const token = jwt.sign({ userId, JWT_SECRET });
        res.send({
            token: token
        })
    }

    res.json({
        msg: "error: user does not exist"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            msg: "error while updating info"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        msg: 'updated successfully'
    })

})




module.exports = { router }