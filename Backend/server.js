const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const {MONGOBD_URL}=require('./config');
mongoose.connect(MONGOBD_URL);
mongoose.connection.on("connected",()=>{
    console.log("database is connected")
})
app.use(express.json());
app.use(cors());
require('./module/user_module');
require('./module/sales_module');
app.use(require('./routes/user_routes'))
app.use(require('./routes/sales_routes'))
app.listen(5000,()=>console.log("server started"));