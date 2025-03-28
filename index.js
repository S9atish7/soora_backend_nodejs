const express=require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes');
const path=require('path');
const cors=require('cors');



const app=express()

const port=process.env.PORT || 4000;

dotEnv.config();

app.use(cors())

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


app.use('/',(req,res)=>{
res.send("<h1>Welcome to Soora");  
})