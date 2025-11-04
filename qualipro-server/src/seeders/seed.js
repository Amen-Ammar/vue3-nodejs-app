const bcrypt = require('bcryptjs');
const sequelize = require('../config');
const { User, Role } = require('../models');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Database synced successfully.');

    const rolesData = [
      { roleName: 'HR', roleCode: 'HR' },
      { roleName: 'Developer', roleCode: 'DEV' },
      { roleName: 'Project Manager', roleCode: 'PM' },
      { roleName: 'Designer', roleCode: 'DSN' },
      { roleName: 'Tester', roleCode: 'TST' },
      { roleName: 'Admin', roleCode: 'ADM' },
    ];

    const roles = await Role.bulkCreate(rolesData);
    console.log('✅ Roles seeded successfully.');

    const adminRole = roles.find((r) => r.roleCode === 'ADM');

    await User.create({
      first_name: 'System',
      last_name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
      roleId: adminRole.id,
    });

    console.log('✅ Admin user created successfully.');
    console.log('🌱 Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
