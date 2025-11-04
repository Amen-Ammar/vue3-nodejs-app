require('dotenv').config();
const userService = require('../services/user.service');
const CustomResponse = require('../utils/responseHandler');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await userService.loginUser(email, password);

    CustomResponse(
      res,
      200,
      {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      },
      true
    );
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal server error.",
      false
    );
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await userService.refreshToken(refreshToken);
    CustomResponse(
      res,
      200,
      {
        accessToken: tokens.newAccessToken,
        refreshToken: tokens.newRefreshToken,
      },
      true
    );
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal server error.",
      false
    );
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    await userService.createUser(data);

    CustomResponse(res, 201, 'User registered successfully', true);
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error.',
      false
    );
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { email } = req.query;
    const condition = email ? { where: { email } } : {};
    const users = await userService.getUsers(condition);

    CustomResponse(res, 200, users, true);
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error.',
      false
    );
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUser(id);

    CustomResponse(res, 200, user, true);
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error.',
      false
    );
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updated = await userService.updateUser(id, data);
    if (!updated) {
      return CustomResponse(res, 404, 'User not found', false);
    }

    CustomResponse(res, 200, 'User updated successfully', true);
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error.',
      false
    );
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return CustomResponse(res, 404, 'User not found', false);
    }

    CustomResponse(res, 200, 'User deleted successfully', true);
  } catch (error) {
    CustomResponse(
      res,
      error.statusCode || 500,
      error.message || 'Internal server error.',
      false
    );
  }
};
