import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import { ErrorMiddleware } from "./middlewares/error-middleware.js";
dotenv.config();

import { User } from "./models/user-model.js";
import { Token } from "./models/token-model.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(ErrorMiddleware);

const start = async () => {
  try {
    await User.sync({ alter: true });
    await Token.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
