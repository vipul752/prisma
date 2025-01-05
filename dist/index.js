"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.use(express_1.default.json());
app.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const user = yield client.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        res.status(201).json({ message: "User created", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating user" });
    }
}));
function addTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, content, userId } = req.body;
        const todo = yield client.todo.create({
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
    });
}
app.get("/getTodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield client.todo.findMany({
            include: {
                user: true,
            },
        });
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
}));
app.get("/getUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client.user.findMany();
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}));
app.post("/addTodos", addTodos);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
