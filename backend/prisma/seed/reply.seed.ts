import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedReplies = async () => {
  await prisma.reply.createMany({
    data: [
      {
        ticket_id: 1,
        replied_by: 3,
        message: "We are looking into your delivery issue.",
      },
      {
        ticket_id: 2,
        replied_by: 2,
        message: "Please try resetting your account password.",
      },
    ],
  });
};

export default seedReplies;
