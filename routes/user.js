const express = require("express");
const router = express.Router();
const user = require('../controller/user');

router.post('/signUp',user.signUp);
router.post('/signIn',user.signIn);
router.post('/resetPassword',user.resetPassword);
router.post('/reset/:token',user.resetToken);


module.exports = router;