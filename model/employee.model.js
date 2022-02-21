const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection.db');
const validator = require('validator');
const Company = require('./company.model');
const Employee = sequelize.define("Employee", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "firstName is required.",
            },
            notNull: {
                msg: "firstName is required.",
            },
            len: {
                args: [3, 21],
                msg: "firstName length must be more then 3, less than 21",
            },
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "lastName is required.",
            },
            notNull: {
                msg: "lastName is required.",
            },
            len: {
                args: [3, 21],
                msg: "lastName length must be more then 3, less than 21",
            },
        },
    },
    nationalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: [true],
                msg: "nationalCode is required.",
            },
            notNull: {
                msg: "nationalCode is required.",
            }
        },
    },
    gender: {
        type: DataTypes.ENUM(
            "male",
            "female",
            "none"
        ),
        defaultValue: 'none',
        validate: {
            isIn: {
                args: [['male', 'female', 'none']],
                msg: "Must be male or female or none"
            }
        },
    },
    role: {
        type: DataTypes.ENUM(
            "admin",
            "user"
        ),
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['user', 'admin']],
                msg: "Must be user or admin"
            }
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
    },
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = Employee;