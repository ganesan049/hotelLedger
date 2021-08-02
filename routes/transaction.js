const express = require("express");
const router = express.Router();
const transaction = require('../controller/transaction');
const middleware = require('../middlewares/requireLogin')

router.post('/addTransaction',middleware,transaction.addTransaction);
router.get('/getTransaction',middleware,transaction.getTransaction);
router.delete('/deleteTransaction',middleware,transaction.deleteTransaction);
router.put('/editTransaction',middleware,transaction.editTransaction);

module.exports = router;