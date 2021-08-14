const express = require("express");
const router = express.Router();
const expense_item = require('../controller/expense-item');
const middleware = require('../middlewares/requireLogin')

router.post('/addItem',middleware,expense_item.addItem);
router.get('/getItem',middleware,expense_item.getItem);
router.delete('/deleteItem',middleware,expense_item.deleteItem);
router.put('/editItem',middleware,expense_item.editItem);

module.exports = router;