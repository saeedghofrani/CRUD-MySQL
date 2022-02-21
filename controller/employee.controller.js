const Employee = require('../model/employee.model');
const Company = require('../model/company.model');
const employeePageRender = async (request, response) => {
    const targetUser = await Employee.findAll({});
    (!targetUser) ? response.render('error', { error: { message: "internal server error", statusCode: 500, } })
        : response.render('employee', { data: targetUser, error: "" });
};
const deleteEmployee = async (request, response) => {
    const nationalCode = request.params.nationalCode;
    let targetUser = await Employee.findOne({ where: { nationalCode: nationalCode } });
    if (!targetUser) {
        return response.render('error', { error: { message: "company not found.", statusCode: 404, } });
    }
    await targetUser.destroy();
    targetUser = await Employee.findAll({});
    (!targetUser) ? response.render('error', { error: { message: "internal server error", statusCode: 500, } })
        : response.render('employee', { data: targetUser, error: "" });
};
const createEmployee = async (request, response) => {
    const targetUser = await Employee.findAll({});
    if (response.locals.error) {
        return response.render('employee', { data: targetUser, error: response.locals.errorMsg });
    }
    const { firstName, lastName, nationalCode, gender, dateOfBirth, CompanyId } = request.body;
    const employee = await Employee.create({ firstName, lastName, CompanyId, nationalCode, gender, dateOfBirth });
    let targetCompany = await Employee.findAll({});
    return response.render('employee', { data: targetCompany, error: "" });
};
const updateEmployee = async (request, response) => {
    if (response.locals.error) {
        return response.status(409).send({ error: response.locals.errorMsg });
    }
    const nationalCode = request.params.nationalCode;
    let targetUser = await Employee.findOne({ where: { nationalCode: nationalCode } });
    if (!targetUser) {
        return response.status(404).send({ message: "employee not found." });
    }
    targetUser = await targetUser.update(request.body);
    if (!targetUser) {
        return response.status(500).send({ message: "internal server error" });
    }
    return response.status(200).send('success');
};
module.exports = { employeePageRender, deleteEmployee, createEmployee, updateEmployee };