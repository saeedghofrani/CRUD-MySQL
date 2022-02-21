const { ValidationErrorItem } = require("sequelize");
function errorHandler(response, error) {
    if (
        error.errors instanceof Array &&
        error.errors[0] instanceof ValidationErrorItem
    ) {
        return response.status(400).send({
            errors: error.errors.map(function (el) {
                return el.message;
            }),
        });
    }
    response.status(500).send({ message: "Internal server error" });
}
module.exports = errorHandler;
