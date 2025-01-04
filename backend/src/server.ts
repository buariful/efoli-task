/* eslint-disable no-console */
import app from "./app";
import config from "./app/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    prisma.$connect();
    console.log("Database connected successfully");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
    console.log("Database disconnected");
    process.exit(1);
  }
}
main();
