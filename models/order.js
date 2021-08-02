const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

const OrdersSchema = new mongoose.Schema({
  item: {
    type: Array,
    trim: true,
    required: [true, 'Please add some Item']
  },
  quantity: {
    type: Array,
    required: [true, 'Please add a Quantity']
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