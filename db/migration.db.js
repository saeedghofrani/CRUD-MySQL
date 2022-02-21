const Company = require("../model/company.model");
const Employee = require("../model/employee.model");

module.exports = (async function () {
    try {
        await Company.sync({ alter: true });
        await Employee.sync({ alter: true });
    } catch (error) {
        console.error("Unable to connect to sync tables:", error);
        process.exit(1);
    }
})();
