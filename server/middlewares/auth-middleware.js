import { ApiErrors } from "../exceptions/api-errors.js";
import tokenService from "../service/token-service.js";

export const AuthMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiErrors.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiErrors.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErrors.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErrors.UnauthorizedError());
  }
};
