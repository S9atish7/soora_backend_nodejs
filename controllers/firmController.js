const Firm = require('../models/Firm');
const Vendor = require('../models/vendor');
const multer = require('multer');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path2D.extname( file.originalname));
  }
});

// Initialize Multer
const upload = multer({ storage: storage });

// Add Firm Function
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    // Corrected filename extraction
    const image = req.file ? req.file.filename : undefined;

    // Find the vendor
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Create new Firm entry
    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id // Corrected variable name
    });

   const savedFirm= await firm.save();
   vendor.firm.push(savedFirm)
   await vendor.save();

    return res.status(200).json({ message: 'Firm added Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteFirmById=async(req,res)=>{
  try {
    const firmId=req.params.firmId;
    const deletedProduct=await Firm.findByIdAndDelete(firmId);
    if(!deletedProduct){
      return res.status(404).json({error:"No product found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal server error"});
  }
}

// Export with multer middleware
module.exports = {
  addFirm: [upload.single('image'), addFirm],deleteFirmById
};
