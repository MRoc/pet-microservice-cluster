import express from "express";
require("express-async-errors");
import { json } from "body-parser";
import { Mongoose } from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await new Mongoose().connect("mongodb://auth-mongo-srv:27017/auth");
    app.listen(3000, () => {
      console.log("Auth service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
