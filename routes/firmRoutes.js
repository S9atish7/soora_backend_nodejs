const express=require('express');
const multer=require('multer');
const firmController=require('../controllers/firmController');
const verifyToken=require('../middlewares/verifyToken');

const router=express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm);

router.get('/uploads/:imageName',(req,res)=>{
  const imageName=req.params.imageName;
  res.headersSent('Content-Type','image.jpeg');
  res.sendFile(Path.join(__dirname,'..','uploads',imageName));
});

router.delete('/productId',firmController.deleteFirmById);

module.exports=router;