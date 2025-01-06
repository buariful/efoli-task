import { TUserCreate, TUserLogin } from "./user.interface";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient({ log: ["query"] });

const createToken = (email: string, id: number, role: string) => {
  const token = jwt.sign(
    { email: email, id: id, role },
    config.jwt_secret as string,
    {
      expiresIn: config.jwt_expires_in,
    }
  );

  return token;
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.salt));
};

const isUserExist = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return result;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const insertUserIntoDB = async (userData: TUserCreate) => {
  const { first_name, last_name, email, password, role } = userData;

  // check if user already exist
  const isUser = await isUserExist(email);
  if (isUser) {
    throw new Error("User already exist");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // create user
  const result = await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Create JWT token
  const token = createToken(email, result?.id, role);

  return { data: result?.id, token };
};

const userLogin = async (loginData: TUserLogin) => {
  const { email, password } = loginData;

  // Find the user by email
  const user = await isUserExist(email);

  if (!user) {
    throw new AppError(400, "Invalid credentials");
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await comparePassword(password, user?.password);

  if (!isPasswordValid) {
    throw new AppError(400, "Invalid credentials");
  }

  // Create JWT token
  const token = createToken(email, user?.id, user?.role);

  return {
    id: user?.id,
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
    token,
  };
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({});

  return result;
};

export const UserServices = {
  insertUserIntoDB,
  isUserExist,
  hashPassword,
  createToken,
  userLogin,
  getAllUsers,
};
