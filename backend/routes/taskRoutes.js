import express from "express";
const router = express.Router();

export default (prisma) =>{
    // Criar tarefa
    router.post("/", async (req, res) =>{
        const { title, description, done, userId } = req.body;
        try {
            let data = {title, description, userId, done};
            
            const task = await prisma.task.create({
                data
            });
            res.json(task);
            console.log("Tarefa criada com sucesso!");
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Listar todas as tarefas
    router.get("/:userId", async (req, res) => {
        const { userId } = req.params;
        try {
            const tasks = await prisma.task.findMany({
                where: { userId: Number(userId) }
            });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar tarefas" });
        }
    });

    // Atualizar uma tarefa
    router.put("/:id", async (req, res) =>{
        const { id } = req.params;
        const { title, description, done } = req.body;
        try {
            const task = await prisma.task.update({
                where: { id: Number(id) },
                data: { title, description, done }
            });
            res.json(task);
            console.log("Tarefa atualizada com sucesso!");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

    // Deletar uma tarefa
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.task.delete({
                where: { id: Number(id) }
            });
            res.json({ message: "Tarefa deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

    return router;
};
