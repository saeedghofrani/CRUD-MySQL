const express = require('express');
const router = express.Router();
const { companyPageRender, deleteCompany, createCompany, updateCompany, employeesCompany } = require('../controller/company.controller.js');
const { companyValidator, updateCompanyValidator } = require('../middleware/company.middleware');
try {
    router.route('/')
        .get(companyPageRender)
        .post(companyValidator, createCompany);
    router.route('/:Cname')
        .get(employeesCompany)
        .delete(deleteCompany)
        .put(updateCompanyValidator, updateCompany);
} catch (error) {
    console.log("database error" + error);
}
module.exports = router;