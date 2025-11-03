import { DataTypes } from "sequelize";
import sequelize from "../../db/postgresql";
import User from "./user-model.js";

const Playlist = sequelize.define("Playlist", {
    id: {
        type: DataTypes.STRING(24),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    songs: {
        type: DataTypes.JSONB, 
        defaultValue: [],
    }
});
Playlist.belongsTo(User, { foreignKey: "userId" });

export default Playlist;
