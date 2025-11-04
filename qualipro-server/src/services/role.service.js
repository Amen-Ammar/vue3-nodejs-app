const { Role } = require("../models");

module.exports = {
    async getRoles() {
        const roles = await Role.findAll();
        return roles
    }
};