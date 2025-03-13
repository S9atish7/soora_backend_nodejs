const Vendor=require('../models/vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.WhatIsYourName

const vendorRegister=async(req,res)=>{
     const {username,email,password} =req.body;
     try{
      const VendorEmail=await Vendor.findOne({email});
      if(VendorEmail){
        return res.status(400).json("Email alreaady taken");
      }
     const hashedPassword=await bcrypt.hash(password,10);

     const newVendor= new Vendor({
      username,
      email,
      password:hashedPassword
     });
     await newVendor.save();
     res.status(201).json({message:"Vendor registered successfully"});
     console.log('registered')

     }catch(error){
      console.log(error);
      res.status(500).json({error:"Internal server error"})

     }
}


const vendorLogin=async(req,res)=>{
  const {email,password}=req.body;
  try{
    const vendor=await Vendor.findOne({email});
    if(!vendor || !(await bcrypt.compare(password,vendor.password))){
      return res.status(401).json({error:"invalid usename or password"})
    }
    const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})

    res.status(200).json({success:"Login successful",token})
    console.log(email,"this is token",token);
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"});

  }
}

const getAllVendors=async(req,res)=>{
  try {
    const vendors=await Vendor.find().populate('firm');
    res.json({vendors})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});

  }
}
const getVendorById = async (req, res) => {
  try {
    const vendorId = req.params.id;

    // Validate ObjectId format
    if (!vendorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid vendor ID format" });
    }

    const vendor = await Vendor.findById(vendorId).populate('firm');

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}