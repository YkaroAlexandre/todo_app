# To Do App

Aplicação web simples para gerenciamento de tarefas (To Do App). O projeto contém um backend em Node.js (Express + Prisma) que expõe uma API REST com autenticação e um frontend React em desenvolvimento.

## Estrutura do projeto (visão rápida)

- `backend/` — API REST
	- `index.js` — ponto de entrada do servidor Express
	- `routes/` — rotas da API (`userRoutes.js`, `taskRoutes.js`)
	- `middleware/auth.js` — middleware JWT que protege rotas
	- `prisma/schema.prisma` — esquema do banco de dados
	- `generated/prisma/` — cliente Prisma gerado (pré-commitado no repositório)

- `frontend/` — app React (em desenvolvimento)
	- `src/` — código-fonte (ex.: `pages/Home.js`, `pages/Login.js`, `services/api.js`)
	- `build/` — pasta de build gerada

## Tecnologias principais

- Node.js, Express
- Prisma ORM (cliente gerado em `backend/generated/prisma`)
- JWT (autenticação) e Bcrypt (hash de senha)
- React (frontend)

## Padrões e convenções do projeto (observáveis no código)

- Autenticação: JWT usado para proteger rotas; ver `backend/middleware/auth.js`. As rotas que alteram dados estão protegidas.
- Validação: `express-validator` é utilizado nas rotas (veja `routes/` para exemplos de validação antes de enviar para o service/DB).
- Prisma: o client gerado foi incluído no repositório (`backend/generated/prisma`). Migrations também estão no repositório em `backend/prisma/migrations/`.
- Organização: responsabilidades separadas por pasta — rotas em `routes/`, middleware em `middleware/`, esquema em `prisma/`.

## Executando o projeto (PowerShell)

As instruções abaixo presumem que você tem Node.js e MySQL instalados.

### Pré-requisitos:

1. **Crie um banco de dados MySQL** chamado `todo_app`:
```sql
CREATE DATABASE todo_app;
```

2. **Configure as variáveis de ambiente**:
   - Copie `backend/.env.example` para `backend/.env` e preencha com suas credenciais MySQL e uma chave JWT
   - Copie `frontend/.env.example` para `frontend/.env`

### Backend (modo desenvolvimento):

```powershell
cd backend
npm install
# Edite o arquivo .env com suas variáveis de ambiente
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

Observação: o repositório já inclui o cliente Prisma gerado em `backend/generated/prisma` e migrations em `backend/prisma/migrations/`. Se você adicionar novos campos ao esquema, execute:
```powershell
npx prisma migrate dev --name descricao_da_mudanca
```

### Frontend (modo desenvolvimento):

```powershell
cd frontend
npm install
npm start
```

O app React abrirá em `http://localhost:3000` (você pode precisar mudar a porta se o backend estiver na mesma)

Para criar um build de produção do frontend:

```powershell
cd frontend
npm run build
```

## Variáveis de Ambiente

### Backend (.env)
```
DATABASE_URL=mysql://usuario:senha@localhost:3306/todo_app
JWT_SECRET=sua_chave_secreta_bem_segura_aqui
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000
```

---

- Revisar `backend/routes/*` para entender a forma como as rotas aceitam e validam entradas antes de alterar o fluxo.
- Se modificar o modelo Prisma (`prisma/schema.prisma`), atualize migrations e regenere o client (`npx prisma migrate dev` / `npx prisma generate`) — note que há um client gerado com o projeto.
- Senhas são sempre hasheadas com bcrypt antes de salvar; autenticação retorna um token JWT usado no header `Authorization: Bearer <token>`.

## Solução de Problemas Comuns

### Erro: "Cannot connect to database"
- Certifique-se de que MySQL está rodando
- Verifique se a `DATABASE_URL` no `.env` está correta
- Confirme que o banco de dados `todo_app` foi criado

### Erro: "Module not found"
- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente em ambas as pastas (backend e frontend)

### Frontend não consegue acessar a API
- Certifique-se de que o backend está rodando (`npm run dev` na pasta backend)
- Verifique se `REACT_APP_API_URL` no frontend está apontando para a URL correta do backend

## Status atual

O backend tem as rotas de usuários e tarefas implementadas, autenticação JWT, hashing de senha e validação básica de entrada. O frontend está em desenvolvimento e contém páginas de Login, Register e Home em `frontend/src/pages`.

### Funcionalidades implementadas (Frontend):

- **Login com validação de erro**: Mensagem de erro é exibida com animação suave quando email ou senha estão incorretos
- **Marcação de tarefas**: Ao clicar no ícone de check em uma tarefa, ela é marcada como concluída no banco de dados
- **Persistência de dados**: As tarefas marcadas como concluídas permanecem marcadas mesmo após recarregar a página

---
