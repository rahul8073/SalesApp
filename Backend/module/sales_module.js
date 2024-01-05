//initialize mongoose
const mongoose=require('mongoose');
//create mongodb Schema to store sales information
const salesSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }

})
mongoose.model("salesModel",salesSchema);