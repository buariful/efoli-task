/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import seedUsers from "./user.seed";
import seedTickets from "./ticket.seed";
import seedReplies from "./reply.seed";

const prisma = new PrismaClient();

const main = async () => {
  try {
    console.log("Seeding users...");
    await seedUsers();

    console.log("Seeding tickets...");
    await seedTickets();

    console.log("Seeding replies...");
    await seedReplies();

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
