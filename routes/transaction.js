const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Transaction = require('../models/Transaction')
const User = require('../models/User')

// fetch all transactions of a user using: GET: '/api/transaction/fetchalltransactions'
router.get('/fetchalltransactions/:_id',async (req,res)=> {
    const {_id} = req.params
    console.log(_id)
    try {
        const transactions = await Transaction.find({user: _id}).sort({date: -1})
        res.json(transactions)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
})

//add a new transaction using: POST: '/api/transaction/addtransaction'
router.post('/addtransaction',async (req,res)=> {
    const {amount,description,isIncome,user} = req.body
    try {
        const newTransaction = new Transaction({
            amount: amount,
            description: description,
            isIncome: isIncome,
            user: user
        })
        const savedTransaction = await newTransaction.save()
        res.json(savedTransaction)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
})

//update a transaction using: PUT: '/api/transaction/updatetransaction/:id'
router.put('/updatetransaction/:id',async (req,res)=> {
    const {amount,description,isIncome} = req.body
    try {
        let transaction = await Transaction.findById(req.params.id)
        if(!transaction) {
            return res.status(404).json({success:false,error:"Transaction not found"})
        }
        transaction.amount = amount
        transaction.description = description
        transaction.isIncome = isIncome
        transaction = await transaction.save()
        res.json(transaction)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
})

//delete a transaction using: DELETE: '/api/transaction/deletetransaction/:id'
router.patch('/deletetransaction/:id',async (req,res)=> {
    try {
        let transaction = await Transaction.findById(req.params.id)
        if(!transaction) {
            return res.status(404).json({success:false,error:"Transaction not found"})
        }
        await Transaction.findByIdAndUpdate(req.params.id,{amount:0})
        res.json({success:true,message:"Transaction has been deleted"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
})



module.exports = router
