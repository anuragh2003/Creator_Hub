import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";
import { UserModel } from "../users/user.model.js";
import type { RegisterInput, LoginInput } from "./auth.validation.js";

const SALT_ROUNDS = 12;

export const authService = {
  async register(data: RegisterInput) {
    const { username, email, password, displayName } = data;

    const existing = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      throw ApiError.conflict("A user with this email or username already exists");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await UserModel.create({
      username,
      email,
      passwordHash,
      displayName: displayName ?? username,
    });

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] }
    );

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
      token,
    };
  },

  async login(data: LoginInput) {
    const { email, password } = data;

    const user = await UserModel.findOne({ email }).select("+passwordHash");
    if (!user) throw ApiError.unauthorized("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] }
    );

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
      token,
    };
  },
};
