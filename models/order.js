const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    trim: true,
    required: [true, 'Please add some Item']
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, 'Please add some Quantity']
  },
  amount: {
    type: Number,
    trim: true,
    required: [true, 'Please add some amount']
  },
})

const OrdersSchema = new mongoose.Schema({
  total: {
    type: Number,
    trim: true,
    required: [true, 'Please add some Item']
  },
  order: {
    type: [ItemSchema],
    required: [true, 'Please add some order']
  },
  user:{
    type:ObjectId,
    require:true,
    ref:"User"
  }
},
{timestamps:true});

const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;