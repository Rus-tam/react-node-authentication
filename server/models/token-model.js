import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import { User } from "./user-model.js";

export const Token = sequelize.define("Token", {
  user: User,
  refreshToken: {
    type: DataTypes.STRING,
    required: true,
  },
});
