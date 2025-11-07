const { sequelize, User, Role } = require("../models");
const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    async loginUser(email, password) {
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid user credentials");
            error.statusCode = 401;
            throw error;
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        let data = {
            avatar: `https://ui-avatars.com/api/?name=${user.first_name + ' ' + user.last_name}&background=random`,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            id: user.id
        }
        return { user: data, accessToken, refreshToken };
    },

    async refreshToken(refreshToken) {
        try {
            let decoded;
            try {
                decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            } catch (error) {
                throw error;
            }
            const user = await User.findByPk(decoded.id);

            if (!user) throw error;

            const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                const err = new Error("Unauthorized - Refresh token expired");
                err.statusCode = 401;
                throw err;
            }
            throw error;
        }
    },

    async createUser(userData) {
        const t = await sequelize.transaction();
        try {
            const user = await User.create(userData, { transaction: t });
            await t.commit();
            return user;
        } catch (error) {
            console.log({ error })
            await t.rollback();
            throw error;
        }
    },

    async getUser(id) {
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password']
            },
            include: {
                model: Role,
                as: 'role',
                attributes: ['id', 'roleName', 'roleCode'],
            },
        });
        return user;
    },

    async getUsers(condition) {
        const page = parseInt(condition.page) || 1;
        const limit = parseInt(condition.limit) || 10;
        const offset = (page - 1) * limit;

        if (condition.where && condition.where.email) {
            const searchValue = condition.where.email;
            condition.where.email = { [Op.iLike]: `%${searchValue}%` };
        }

        const { count, rows } = await User.findAndCountAll({
            ...condition,
            attributes: { exclude: ['password'] },
            include: {
                model: Role,
                as: 'role',
                attributes: ['id', 'roleName', 'roleCode'],
            },
            limit,
            offset,
            distinct: true,
            order: [['createdAt', 'DESC']],
        });

        const users = rows.map((user) => {
            const plainUser = user.get({ plain: true });

            return {
                ...plainUser,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    `${plainUser.first_name} ${plainUser.last_name}`
                )}&background=random`,
            };
        });

        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            users,
        };
    },

    async updateUser(id, data) {
        const t = await sequelize.transaction();
        try {
            const user = await User.findByPk(id, { transaction: t });
            if (!user) {
                await t.rollback();
                return null;
            }
            await user.update(data, { transaction: t });
            await t.commit();
            return user;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },

    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    },

    async restoreUser(id) {
        const user = await User.findByPk(id, { paranoid: false });
        if (user && user.deletedAt) {
            await user.restore();
        }
        return user;
    }
};