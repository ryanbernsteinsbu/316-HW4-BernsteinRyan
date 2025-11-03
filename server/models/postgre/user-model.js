import { DataTypes } from "sequelize";
import sequelize from "../../db/postgresql";
import Playlist from "./playlist-model.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING(24),
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
User.hasMany(Playlist, { foreignKey: "userId" });

export default User;

