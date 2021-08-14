const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

const itemsSchema = new mongoose.Schema({
  item: {
    type: String,
    trim: true,
    required: [true, 'Please add some item']
  },
  user:{
    type:ObjectId,
    require:true,
    ref:"User"
  }
},{timestamps:true});

const Items = mongoose.model('ExpenseItems', itemsSchema);
module.exports = Items;