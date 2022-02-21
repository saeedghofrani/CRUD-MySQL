const Company = require('../model/company.model');
const Employee = require('../model/employee.model');
const companyPageRender = (_request, response) => {
    Company.findAll({}).then(company => response.render('company', { data: company, error: "" }))
        .catch(err => response.render('error', { error: { message: "internal server error" + err, statusCode: 500, } }));
};
const deleteCompany = async (request, response) => {
    const Cname = request.params.Cname;
    let targetUser = await Company.findOne({ where: { Cname: Cname } });
    (targetUser === 0) ? response.status(404).send('company not found') : await targetUser.destroy();
    response.status(200).send('success');
};
const createCompany = async (request, response) => {
    try {
        const targetUser = await Company.findAll({});
        if (response.locals.error) {
            return response.render('company', { data: targetUser, error: response.locals.errorMsg });
        }
        const { Cname, registrationNumber, city, province, phoneNumber } = request.body;
        await Company.create({ Cname, registrationNumber, city, province, phoneNumber });
        response.redirect(302, '/company');
    } catch (error) {
        response.render('error', { error: { message: "internal server error" + error, statusCode: 500, } });
    }
};
const updateCompany = async (request, response) => {
    if (response.locals.error) {
        return response.status(409).send({ error: response.locals.errorMsg });
    }
    const CompanyCname = request.params.Cname;
    let targetUser = await Company.findOne({ where: { Cname: CompanyCname } });
    if (!targetUser) {
        return response.status(404).send({ message: "company not found." });
    }
    targetUser = await targetUser.update(request.body);
    (!targetUser) ? response.status(500).send({ message: "internal server error" }) : response.status(200).send('success');
};
const employeesCompany = async (request, response) => {
    const registrationNumber = request.params.Cname;
    const employee = await Employee.findAll({
        include: [{ model: Company, where: { registrationNumber: registrationNumber } }]
    });
    return response.render('employee', { data: employee, error: "" });
};
module.exports = { companyPageRender, deleteCompany, createCompany, updateCompany, employeesCompany };