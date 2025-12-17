const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: DB_HOST, // server ở đâu
    port: DB_PORT, // cổng nào
    dialect: "postgres",
  }
);

const fs = require("fs");
const path = require("path");
const modelPath = path.join(__dirname, "../models");

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith(".js") && file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(modelsPath, file))(
      sequelize,
      Sequelize.DataTypes
    );
    module.exports[model.name] = model;
  });
module.exports.sequelize = sequelize;
