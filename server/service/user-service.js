import { User } from "../models/user-model.js";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import { UserDto } from "../dtos/user-dto.js";
import { ApiErrors } from "../exceptions/api-errors.js";

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiErrors.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({ email, password: hashPassword, activationLink });
    // await mailService.sendActivationMail(email, `${process.env.APi_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiErrors.BadRequest("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiErrors.BadRequest("Неверный логин или пароль");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiErrors.BadRequest("Неверный логин или пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new UserService();
