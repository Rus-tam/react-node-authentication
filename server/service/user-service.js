import { User } from "../models/user-model.js";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import mailService from "./mail-service.js";

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);
  }
}

export default new UserService();
