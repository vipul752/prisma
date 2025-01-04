import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
  await client.user.create({
    data: {
      name: "John Doe",
      email: "john2@gmail.com",
      password: "123123",
    },
  });
}

createUser();
