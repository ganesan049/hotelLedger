const express = require("express");
const router = express.Router();
const expense = require('../controller/expense');
const middleware = require('../middlewares/requireLogin')

router.post('/addExpense',middleware,expense.addExpense);
router.get('/getExpense',middleware,expense.getExpense);
router.delete('/deleteExpense',middleware,expense.deleteExpense);
router.put('/editExpense',middleware,expense.editExpense);

module.exports = router;