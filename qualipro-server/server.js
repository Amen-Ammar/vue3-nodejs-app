const express = require('express');
const cors = require('cors');
const http = require('http');
const sequelize = require('./src/config');
const config = require('./src/config/db.config');
const userRoutes = require('./src/routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

const PORT = config.server.port || 3000;

const server = http.createServer(app);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
  }
}

startServer();
