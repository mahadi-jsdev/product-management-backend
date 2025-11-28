import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { validate } from "../utils/zod-validator.js";
import { userZod } from "../types/user-zod.js";
import { encrypt } from "../utils/jwt.js";

const auth = Router();

const DEMO_USER = {
  id: "1",
  username: "demo",
  email: "demo@example.com",
  password: "password",
};

auth.post("/login", validate(userZod), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if user not founc
    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      throw new Error("Invalid email or password");
    }

    const userPayload = { email: DEMO_USER.email, name: "Demo User" };
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await encrypt({ user: userPayload, expires });

    res.cookie("session", session, {
      httpOnly: true,
      expires,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login Successful",
    });
  } catch (err) {
    next(err);
  }
});

auth.delete("/logout", (_, res, next) => {
  try {
    res.clearCookie("session", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
});

export default auth;
