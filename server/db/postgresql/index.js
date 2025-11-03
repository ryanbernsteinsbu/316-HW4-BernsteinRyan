import { Sequelize } from "sequelize";
const dotenv = require('dotenv').config({ path: __dirname + '/../../.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
