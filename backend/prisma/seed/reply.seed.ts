import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedReplies = async () => {
  await prisma.reply.createMany({
    data: [
      {
        ticket_id: 1, // Replace with the appropriate `ticket.id`
        replied_by: 3, // Replace with the appropriate `user.id` for an executive or admin
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
