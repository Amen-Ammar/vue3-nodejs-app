const sequelize = require('../config/db.config');
const User = require('./user.model');
const Role = require('./role.model');

Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

module.exports = {
  sequelize,
  User,
  Role,
};
