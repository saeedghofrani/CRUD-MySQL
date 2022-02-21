const express = require('express');
const router = express.Router();
const companyRouter = require('./company.route.js');
const employeeRouter = require('./employee.route.js');
router.use('/company', companyRouter);
router.use('/employee', employeeRouter);
module.exports = router;