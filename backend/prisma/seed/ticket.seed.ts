import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedTickets = async () => {
  await prisma.ticket.createMany({
    data: [
      {
        subject: "Issue with product delivery",
        description: "The product was not delivered on time.",
        status: "OPEN",
        customer_id: 1,
      },
      {
        subject: "Need help with account setup",
        description: "I'm unable to set up my account.",
        status: "ASSIGNED",
        customer_id: 1,
        executive_id: 3,
      },
    ],
  });
};

export default seedTickets;
