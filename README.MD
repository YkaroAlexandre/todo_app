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

As instruções abaixo presumem que você tem Node.js instalado.

- Backend (modo desenvolvimento):

```powershell
cd backend
npm install
# crie um .env com as variáveis necessárias (DB URL, JWT secret).
npm run dev
```

Observação: o repositório já inclui o cliente Prisma gerado em `backend/generated/prisma` e migrations em `backend/prisma/migrations/`. Se você preferir regenerar o client localmente use `npx prisma generate` (com as variáveis de ambiente configuradas).

- Frontend (modo desenvolvimento):

```powershell
cd frontend
npm install
npm start
```

Para criar um build de produção do frontend:

```powershell
cd frontend
npm run build
```

## Pontos importantes ao contribuir

- Revisar `backend/routes/*` para entender a forma como as rotas aceitam e validam entradas antes de alterar o fluxo.
- Se modificar o modelo Prisma (`prisma/schema.prisma`), atualize migrations e regenere o client (`npx prisma migrate dev` / `npx prisma generate`) — note que há um client gerado com o projeto.
- Senhas são sempre hasheadas com bcrypt antes de salvar; autenticação retorna um token JWT usado no header `Authorization: Bearer <token>`.

## Status atual

O backend tem as rotas de usuários e tarefas implementadas, autenticação JWT, hashing de senha e validação básica de entrada. O frontend está em desenvolvimento e contém páginas de Login, Register e Home em `frontend/src/pages`.

---
