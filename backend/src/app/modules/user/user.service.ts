import { TUserCreate } from "./user.interface";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const prisma = new PrismaClient({ log: ["query"] });

const insertUserIntoDB = async (userData: TUserCreate) => {
  const { first_name, last_name, email, password, role } = userData;

  // hash password
  const hashedPassword = await bcrypt.hash(password, Number(config.salt));

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
  const token = jwt.sign(
    { email: email, id: result?.id },
    config.jwt_secret as string,
    {
      expiresIn: config.jwt_expires_in,
    }
  );

  return { data: result?.id, token };
};

export const UserServices = {
  insertUserIntoDB,
};
