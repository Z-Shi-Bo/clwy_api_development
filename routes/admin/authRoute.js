const express = require('express');
const router = express.Router();
const { sign_in } = require('../../controller/admin/authController');
const { loginValidate } = require('../../validator/authValidate');

router.post('/sign_in', loginValidate, sign_in);

module.exports = router;
