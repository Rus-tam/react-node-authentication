import userService from "../service/user-service.js";

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log("blablabla", email);
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async activate(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123", "321"]);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
