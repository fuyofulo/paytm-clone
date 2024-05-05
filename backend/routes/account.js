const express = require('express');
const { authMiddleware } = require ('../middleware');
const { Account } = require ('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.post('/balance', authMiddleware, async (req, res) => {  
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if( account.balance < amount ) {
        await session.abortTransaction();
        res.status(404).json({
            msg: 'Insufficient balance'
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if (!toAccount) {
        await session.abortTransaction();
      res.status(411).json({
        msg: "invalid account",
      });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: - amount }}).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: + amount }}).session(session);

    await session.commitTransaction();

    res.json({
        msg: 'transfer successful'
    })

})

module.exports = router;