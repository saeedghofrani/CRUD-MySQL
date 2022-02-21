const express = require('express');
const router = express.Router();
const { employeePageRender, deleteEmployee, createEmployee, updateEmployee } = require('../controller/employee.controller.js');
const { employeeValidator, updateEmployeeValidator } = require('../middleware/employee.middleware');
try {
    router.route('/')
        .get(employeePageRender)
        .post(employeeValidator, createEmployee);
    router.route('/:nationalCode')
        .delete(deleteEmployee)
        .put(updateEmployeeValidator, updateEmployee);
} catch (error) {
    console.log("database error" + error);
}
module.exports = router;
