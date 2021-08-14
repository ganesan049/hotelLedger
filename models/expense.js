const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

const ExpensesSchema = new mongoose.Schema({
  total: {
    type: Number,
    trim: true,
    required: [true, 'Please add some Item']
  },
  item: {
    type: String,
    trim: true,
    required: [true, 'Please add some order']
  },
  user:{
    type:ObjectId,
    require:true,
    ref:"User"
  }
},
{timestamps:true});

const Expenses = mongoose.model('Expenses', ExpensesSchema);
module.exports = Expenses;