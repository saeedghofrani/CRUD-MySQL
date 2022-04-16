const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection.db');
const validator = require('validator');
const Employee = require('./employee.model');
const Company = sequelize.define("Company", {
    Cname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Cname is required.",
            },
            notNull: {
                msg: "Cname is required.",
            },
            len: {
                args: [3, 100],
                msg: "Cname length must be more then 3",
            },
        },
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isNumeric: true,
        validate: {
            notEmpty: {
                args: [true],
                msg: "registrationNumber is required.",
            },
            notNull: {
                msg: "registrationNumber is required.",
            }
        },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true,
        validate: {
            notEmpty: {
                args: [true],
                msg: "city is required.",
            },
            notNull: {
                msg: "city is required.",
            }
        },
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true,
        validate: {
            notEmpty: {
                args: [true],
                msg: "province is required.",
            },
            notNull: {
                msg: "province is required.",
            }
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: [true],
                msg: "phoneNumber is required.",
            },
            notNull: {
                msg: "phoneNumber is required.",
            },
            isPhoneNumber(value) {
                if (!validator.isMobilePhone(value)) {
                    throw new Error("invalid phone number.");
                }
            },
        },
    }
}, {
    freezeTableName: true,
    timestamps: true
});
Company.hasMany(Employee, {
    onDelete: "CASCADE",
});
Company.belongsTo(Company, {
    foreignKey: 'companyId'
});
Employee.belongsTo(Company);
module.exports = Company;