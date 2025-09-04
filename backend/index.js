import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma/index.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Está rodando");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})

app.use("/users", userRoutes(prisma));
app.use("/tasks", taskRoutes(prisma));
