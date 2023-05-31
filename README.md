# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNS (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Comandos do terminal

- npm init -y
- npm tsc --init

Dependências de desenvolvimento

- npm i typescript @types/node tsx tsup -D
- npm i eslint @rocketseat/eslint-config -D
- npm i prisma -D
- npm i -D @types/bcryptjs
- npm i vitest vite-tsconfig-paths -D
- npm i @vitest/coverage-c8 -D
- npm i -D @vitest/ui

Dependências de produção

- npm i fastify
- npm i dotenv
- npm i zod
- npm i @prisma/client
- npm i bcryptjs
- npm i dayjs

### Configuração do package.json

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start:dev": "tsx watch src/server.ts",
  "start": "node build/server.js",
  "build": "tsup src --out-dir build",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:ui": "vitest --ui"
},
```

### Configuração do tsconfig.json

```
"target": "es2020"
"baseUrl": "./",
"paths": {
  "@/*": ["./src/*"]
},
```

### Inicializar conexão com banco de dados

- npx prisma init
- npx prisma generate
- Com o container rodando
- npx prisma migrate dev
- Visualizar banco npx prisma studio

### Docker

- Docker com postgreSql na máquina local
- Terminal
- Criar o container

```
 docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

- Listar, Inciar, finalizar e remover o container

```
 docker ps -a
 docker start api-solid-pg
 docker stop <nome>
 docker rm <nome>
```

- Docker compose

```
docker compose up -d
docker compose stop
docker compose down
```

### Testes

```
  npm run test
  npm run test:watch
  npm run test:coverage
  npm run test:ui
```
