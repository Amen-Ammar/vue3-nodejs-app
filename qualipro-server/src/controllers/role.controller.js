require('dotenv').config();
const roleService = require('../services/role.service');
const CustomResponse = require('../utils/responseHandler');

exports.getRoles = async (req, res) => {
  try {
    const roles = await roleService.getRoles()
    CustomResponse(res, 200, roles, true);
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error.',
      false
    );
  }
};