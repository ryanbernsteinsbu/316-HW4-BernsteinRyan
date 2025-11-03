const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });
import { Sequelize } from "sequelize";

async function clearTable(model, modelName) {
  try {
    await model.destroy({ where: {}, truncate: true });
    console.log(`${modelName} cleared`);
  } catch (err) {
    console.error(err);
  }
}

async function fillTable(model, modelName, data) {
  try {
    await model.bulkCreate(data);
    console.log(`${modelName} filled`);
  } catch (err) {
    console.error(err);
  }
}

async function resetSQL() {
    const Playlist = require('../../../models/postgre/playlist-model')
    const User = require("../../../models/postgre/user-model")
    const testData = require("../example-db-data.json")

    console.log("Resetting the Mongo DB")
    await clearCollection(Playlist, "Playlist");
    await clearCollection(User, "User");
    await fillCollection(Playlist, "Playlist", testData.playlists);
    await fillCollection(User, "User", testData.users);
}

const mongoose = require('mongoose')
mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => { resetMongo() })
    .catch(e => {
        console.error('Connection error', e.message)
    })


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

