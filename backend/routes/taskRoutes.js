import express from "express";
const router = express.Router();

export default (prisma) => {
    // Criar tarefa
    router.post("/", async (req, res) => {
        const userId = req.user.userId;
        const { title, description, done } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({ error: "Título é obrigatório" });
        }

        try {
            const task = await prisma.task.create({
                data: {
                    title: title.trim(),
                    description,
                    done,
                    userId,
                },
            });

            return res.status(201).json(task); // 201 Created
        } catch (error) {
            return res
                .status(500).json({ error: "Erro ao criar tarefa." }); // não expõe message
        }
    });

    // Listar todas as tarefas do usuário logado
    router.get("/", async (req, res) => {
        const userId = req.user.userId;

        try {
            const tasks = await prisma.task.findMany({
                where: { userId: Number(userId) },
                orderBy: { id: "desc" },
            });

            return res.json(tasks);
        } catch (error) {
            return res
                .status(500).json({ error: "Erro ao listar tarefas." });
        }
    });

    // Atualizar uma tarefa
    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const { title, description, done } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        try {
            const existing = await prisma.task.findUnique({
                where: { id: Number(id) },
            });

            if (!existing) {
                return res.status(404).json({ error: "Tarefa não encontrada" });
            }
            if (existing.userId !== req.user.userId) {
                return res.status(403).json({ error: "Acesso negado" });
            }

            if (title !== undefined && !title?.trim()) {
                return res.status(400).json({ error: "Título não pode ficar vazio" });
            }

            const updated = await prisma.task.update({
                where: { id: Number(id) },
                data: {
                    ...(title !== undefined ? { title: title.trim() } : {}),
                    description,
                    done,
                },
            });

            return res.json(updated);
        } catch (error) {
            return res
                .status(500)
                .json({ error: "Erro ao atualizar tarefa." });
        }
    });

    // Deletar uma tarefa
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        try {
            const existing = await prisma.task.findUnique({
                where: { id: Number(id) },
            });

            if (!existing) {
                return res.status(404).json({ error: "Tarefa não encontrada" });
            }
            if (existing.userId !== req.user.userId) {
                return res.status(403).json({ error: "Acesso negado" });
            }

            await prisma.task.delete({
                where: { id: Number(id) },
            });

            return res.json({ message: "Tarefa deletada com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar tarefa." });
        }
    });

    return router;
};
