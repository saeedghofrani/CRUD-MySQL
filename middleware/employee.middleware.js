const validator = require('validator');
const Employee = require('../model/employee.model');
const employeeValidator = async (req, res, next) => {
    let { firstName, lastName, nationalCode, gender, dateOfBirth, CompanyId } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    nationalCode = nationalCode.trim();
    gender = gender.trim();
    dateOfBirth = dateOfBirth.trim();
    CompanyId = CompanyId.trim();
    res.locals = {
        error: false,
        errorMsg: []
    };
    if (!firstName || validator.isEmpty(firstName) || firstName.length < 2 || firstName.length > 30) {
        res.locals.error = true;
        res.locals.errorMsg.push("firstName name is required (more than 2 letter and less than 30 letter)");
    }
    if (!nationalCode || validator.isEmpty(nationalCode) || nationalCode.length !== 10 || (await Employee.findOne({ nationalCode: nationalCode }))) {
        res.locals.error = true;
        res.locals.errorMsg.push("national Code (unique!) is required (contain 11 digit)");
    }
    if (!lastName || validator.isEmpty(lastName)) {
        res.locals.error = true;
        res.locals.errorMsg.push("lastName name is required ");
    }
    if (!gender || validator.isEmpty(gender)) {
        res.locals.error = true;
        res.locals.errorMsg.push("gender is required [male, female]");
    }
    if (!dateOfBirth || validator.isEmpty(dateOfBirth)) {
        res.locals.error = true;
        res.locals.errorMsg.push("date Of Birth (unique!) is required ");
    }
    if (!CompanyId || validator.isEmpty(CompanyId)) {
        res.locals.error = true;
        res.locals.errorMsg.push("companyId  is required ");
    }
    next();
};
const updateEmployeeValidator = async (req, res, next) => {
    res.locals = {
        error: false,
        errorMsg: []
    };
    if ('firstName' in req.body) {
        let { firstName } = req.body;
        firstName = firstName.trim();
        if (!firstName || validator.isEmpty(firstName) || firstName.length < 2 || firstName.length > 30) {
            res.locals.error = true;
            res.locals.errorMsg.push("firstName name is required (more than 2 letter and less than 30 letter)");
        }
    }
    if ('lastName' in req.body) {
        let { lastName } = req.body;
        lastName = lastName.trim();
        if (!lastName || validator.isEmpty(lastName)) {
            res.locals.error = true;
            res.locals.errorMsg.push("lastName name is required ");
        }
    }
    if ('nationalCode' in req.body) {
        let { nationalCode } = req.body;
        nationalCode = nationalCode.trim();
        if (!nationalCode || validator.isEmpty(nationalCode) || nationalCode.length !== 10 || (await Employee.findOne({ nationalCode: nationalCode }))) {
            res.locals.error = true;
            res.locals.errorMsg.push("national Code (unique!) is required (contain 11 digit)");
        }
    }
    if ('gender' in req.body) {
        let { gender } = req.body;
        gender = gender.trim();
        if (!gender || validator.isEmpty(gender)) {
            res.locals.error = true;
            res.locals.errorMsg.push("gender is required [male, female]");
        }
    }
    if ('dateOfBirth' in req.body) {
        let { dateOfBirth } = req.body;
        dateOfBirth = dateOfBirth.trim();
        if (!dateOfBirth || validator.isEmpty(dateOfBirth)) {
            res.locals.error = true;
            res.locals.errorMsg.push("date Of Birth (unique!) is required ");
        }
    }
    if ('CompanyId' in req.body) {
        let { CompanyId } = req.body;
        CompanyId = CompanyId.trim();
        if (!CompanyId || validator.isEmpty(CompanyId)) {
            res.locals.error = true;
            res.locals.errorMsg.push("companyId  is required ");
        }
    }
    next();
};
module.exports = { employeeValidator, updateEmployeeValidator };