import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { Token } from "../models/token-model.js";
import jwt from "jsonwebtoken";
dotenv.config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });
    const refreshToken = jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
