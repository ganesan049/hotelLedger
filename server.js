require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const PORT = process.env.PORT || 5000;

const order = require('./routes/order')
const transaction = require('./routes/transaction')
const user = require('./routes/user')
const items = require('./routes/items')
const expense = require('./routes/expense')
const expense_item = require('./routes/expense-item')

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/transaction',transaction);
app.use('/api/order',order);
app.use('/api/user',user);
app.use('/api/item',items);
app.use('/api/expense',expense);
app.use('/api/expense-item',expense_item);

app.listen(PORT,() => {
    console.log(`server is running at ${PORT}`)
});
