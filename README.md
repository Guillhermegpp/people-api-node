# People API Node

API REST para gerenciamento de pessoas, desenvolvida com JavaScript, Node.js, Express e PostgreSQL.

Projeto de estudo criado para praticar desenvolvimento de APIs, operações CRUD, integração com banco de dados, validação de dados e variáveis de ambiente.

## Tecnologias

- JavaScript
- Node.js
- Express
- PostgreSQL
- pg
- dotenv

## Funcionalidades

- Listar pessoas
- Cadastrar pessoas
- Atualizar pessoas
- Excluir pessoas
- Validação dos dados recebidos
- Persistência dos dados no PostgreSQL

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/pessoas` | Lista todas as pessoas |
| POST | `/pessoas` | Cadastra uma nova pessoa |
| PUT | `/pessoas/:id` | Atualiza uma pessoa |
| DELETE | `/pessoas/:id` | Exclui uma pessoa |

## Exemplos de requisições

### GET - Listar pessoas

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/pessoas"
```

### POST - Cadastrar pessoa

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/pessoas" -ContentType "application/json" -Body '{"nome":"Maria","idade":"29","profissao":"Designer"}'
```

### PUT - Atualizar pessoa

```powershell
Invoke-RestMethod -Method Put -Uri "http://localhost:3000/pessoas/3" -ContentType "application/json" -Body '{"nome":"Maria Silva","idade":"30","profissao":"Desenvolvedora"}'
```

### DELETE - Excluir pessoa

```powershell
Invoke-RestMethod -Method Delete -Uri "http://localhost:3000/pessoas/3"
```

## Como executar

Clone o repositório e instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=people_manager
```

Inicie o servidor:

```bash
node server.js
```

A API estará disponível em:

```text
http://localhost:3000
```

## Banco de dados

A aplicação utiliza PostgreSQL para persistência dos dados.

### Tabela utilizada

```sql
CREATE TABLE pessoas (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    profissao VARCHAR(100) NOT NULL
);
```