import { TUserCreate } from "./user.interface";
import { PrismaClient } from "@prisma/client";
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient({ log: ["query"] });

const insertUserIntoDB = async (userData: TUserCreate) => {
  const { first_name, last_name, email, password, role } = userData;
  const result = await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password,
      role,
    },
  });

  return result;
};

export const UserServices = {
  insertUserIntoDB,
};
