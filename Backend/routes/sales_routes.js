const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const salesModel = mongoose.model("salesModel");

//post mthod use add the sales information
router.post('/addsales', (req, res) => {
    const { productName, quantity, amount } = req.body;
    if (!productName || !quantity || !amount) {
        return res.status(400).json({ error: "all fields are mandatory" })
    }
    //check productName already exist or not in database
    salesModel.findOne({ productName: productName })
        .then(indb => {
            if (indb) {
                res.status(400).json({ error: "product name is already exist" })
            }
            else {
                //entry in sales information
                const sales = new salesModel({
                    productName: productName,
                    quantity: quantity,
                    amount: amount
                });
                sales.save()
                    .then(add => {
                        res.status(200).json({ result: "sales entry successfull" });
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})
// get the top 5 sales  sorted form
router.get("/top5",(req,res)=>{
    salesModel.find().sort({amount:-1})
    .then(data=>{
        res.status(200).json({result:data});
    })
    .catch(err=>{
        return res.status(400).json({error:err});
    })
})
//get the total revenue
router.get("/totalrevenue",(req,res)=>{
    salesModel.find()
    .then(data=>{
       res.status(200).json({result:data});
    })
    .catch(err=>{
        return res.status(400).json({error:err});
    })
})
module.exports = router;