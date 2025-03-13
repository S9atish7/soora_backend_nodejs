const express=require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes');
const path=require('path');



const app=express()

const port=4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected suucessfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json());

app.use('/firm',firmRoutes);

app.use('/vendor',vendorRoutes);

app.use('/product',productRoutes);

app.use('/uploads',express.static('uploads'));

app.listen(port,()=>{
  console.log(`server started and running at ${port}`);
});


app.use('/home',(req,res)=>{
res.send("<h1>Welcome to Soora");  
})