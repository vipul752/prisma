import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const client = new PrismaClient();

app.use(express.json());

app.post("/createUser", async (req: any, res: any) => {
  try {
    const { email, name, password } = req.body;
    const user = await client.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

async function addTodos(req: any, res: any) {
  const { title, content, userId } = req.body;
  const todo = await client.todo.create({
    data: {
      title,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(201).json({ message: "Todo created", todo });
}

app.get("/getTodos", async (req: any, res: any) => {
  try {
    const todos = await client.todo.findMany({
      include: {
        user: true,
      },
    });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

app.get("/getUsers", async (req: any, res: any) => {
  try {
    const user = await client.user.findMany();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/addTodos", addTodos);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
