const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true
  },
  area: {
    type: String,
    required: true,
  },
  category: [{
    type: String,
    enum: ['veg', 'non-veg']
  }],
  region: [{
    type: String,
    enum: ['south-indian', 'north-indian', 'chineese', 'bakery'] // Fixed "noth-indian" to "north-indian"
  }],
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor'
  }],
  products:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'product'
    }
  ]
});

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
