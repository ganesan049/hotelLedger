const express = require("express");
const router = express.Router();
const order = require('../controller/order');
const middleware = require('../middlewares/requireLogin')

router.post('/addOrder',middleware,order.addOrder);
router.get('/getOrder',middleware,order.getOrder);
router.delete('/deleteOrder',middleware,order.deleteOrder);
router.put('/editOrder',middleware,order.editOrder);

module.exports = router;