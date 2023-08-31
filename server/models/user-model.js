import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  activationLink: {
    type: DataTypes.STRING,
  },
});
