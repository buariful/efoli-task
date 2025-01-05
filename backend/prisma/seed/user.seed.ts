import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

const seedUsers = async () => {
  await prisma.user.createMany({
    data: [
      {
        email: "customer1@example.com",
        first_name: "John",
        last_name: "Doe",
        password: "a123456",
        role: UserRole.CUSTOMER,
      },
      {
        email: "admin1@example.com",
        first_name: "Admin",
        last_name: "User",
        password: "a123456",
        role: UserRole.ADMIN,
      },
      {
        email: "executive1@example.com",
        first_name: "Jane",
        last_name: "Smith",
        password: "a123456",
        role: UserRole.EXECUTIVE,
      },
    ],
  });
};

export default seedUsers;
