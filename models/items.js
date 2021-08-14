const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

const itemsSchema = new mongoose.Schema({
  item: {
    type: String,
    trim: true,
    required: [true, 'Please add some item']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  user:{
    type:ObjectId,
    require:true,
    ref:"User"
  }
},{timestamps:true});

const Items = mongoose.model('items', itemsSchema);
module.exports = Items;