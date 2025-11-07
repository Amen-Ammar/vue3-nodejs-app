const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    roleCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'roles',
    timestamps: false,
});

module.exports = Role;
