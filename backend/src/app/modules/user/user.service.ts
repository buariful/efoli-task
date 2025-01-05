import { TUserCreate } from "./user.interface";
import { PrismaClient } from "@prisma/client";
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const insertUserIntoDB = (userData: TUserCreate) => {
  const { first_name, last_name, email, password, role } = userData;
  const result = prisma.user.create({
    data: {},
  });
  return result;
};

export const User = {
  insertUserIntoDB,
};
