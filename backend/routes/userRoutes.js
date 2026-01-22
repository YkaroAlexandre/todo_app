import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const router = express.Router();

export default (prisma) => {
    // Criar usuario
    router.post("/", 
        [
            body("name").notEmpty().withMessage("Nome é obrigatório!"),
            body("email").isEmail().withMessage("Email inválido"),
            body("password").isLength({ min:6 }).withMessage("A senha deve ter pelo menos 6 caracteres")
        ],
        async (req, res) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array()});
            }

            const {name, email, password} = req.body;
            try {
                // Criptografando a senha
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await prisma.user.create({
                    data: {name, email, password: hashedPassword}
                });
                res.json(user);
                console.log("Criado com sucesso!");
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        });

    // Listar todos os usuários
    router.get("/", async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar usuários" });
        }
    });

    // Listar por ID
    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) }
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Deletar um usuário
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.user.delete({
                where: { id: Number(id) }
            });
            res.status(204).send();
            console.log("Deletado com sucesso!");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Atualizar um usuário
    router.put("/:id", async (req, res) =>{
        const {id} = req.params;
        const {name, email, password} = req.body;
        try {
            let data = {name, email};
            if (password) {
                data.password = await bcrypt.hash(password, 10);
            }
            const user = await prisma.user.update({
                where: {id: Number(id)},
                data
            });
            res.json(user);
            console.log("Atualizado com sucesso!");

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });

    // Rota de login com validação
    router.post("/login", async (req, res) =>{
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })
            if (!user) return res.status(401).json({error: "Usuário não encontrado."});
            
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(401).json({error: "Senha Invalida."});
        

            const token = jwt.sign (
                {userId: user.id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            );
            res.json({token})
        }
        catch (error){
            res.status(500).json({error: error.message})
        }
    });
    return router;
};