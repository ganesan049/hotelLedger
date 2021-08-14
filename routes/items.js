const express = require("express");
const router = express.Router();
const items = require('../controller/items');
const middleware = require('../middlewares/requireLogin')

router.post('/addItem',middleware,items.addItem);
router.get('/getItem',middleware,items.getItem);
router.delete('/deleteItem',middleware,items.deleteItem);
router.put('/editItem',middleware,items.editItem);

module.exports = router;