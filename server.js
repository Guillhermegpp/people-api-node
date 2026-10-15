//importar o Express para dentro deste arquivo.
const express = require("express")

//cria a nossa aplicação/servidor dentro da variavel app
const app = express()

/*
app vai ser o objeto que vamos usar para configurar nosso servidor:
app.get(...)
app.post(...)
app.listen(...)
 */
require("dotenv").config()

const { Pool } = require("pg")

//o Pool administra várias conexões e reutiliza elas.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
//  |||| "PostgreSQL, execute esse SQL para mim."
//  vvvv só pra teste
/*pool.query("SELECT * FROM pessoas", (erro, resultado) => {
    //me dê todas as pessoas da tabela.
    if (erro) {
        console.error(erro)
        return
    }

    console.log(resultado.rows)
})
*/

app.use(express.json()) // habilita a leitura json

/*
app → nossa aplicação Express
.listen() → manda o servidor começar a "escutar"
3000 → a porta onde ele vai ficar disponível
 */

app.listen(3000)



app.get("/", (req, res) => {
    res.send("Servidor fundionando")
})


//"o async e o await - > Espera o PostgreSQL terminar essa consulta antes de continuar."
app.get("/pessoas", async (req, res) => {
    const resultado = await pool.query("SELECT * FROM pessoas")

    res.json(resultado.rows)
})

app.post("/pessoas", async (req, res) => {
    const { nome, idade, profissao } = req.body
    const idadeNumerica = Number(idade)
    if (nome.trim() === "" ||
        idadeNumerica <= 0 || 
        idadeNumerica >= 130  ||
        Number.isNaN(idadeNumerica) ||
        profissao.trim() === "") {
            return res.status(400).json({
                mensagem: "Dados incorretos"
        })
    }
    const resultado = await pool.query(
        "INSERT INTO pessoas (nome, idade, profissao) VALUES ($1, $2, $3) RETURNING *",
        [nome, idadeNumerica, profissao]
    )

    res.json(resultado.rows[0])
})

app.delete("/pessoas/:id", async (req, res) => {

    const id = Number(req.params.id)

    const resultado = await pool.query(
        "DELETE FROM pessoas WHERE id = $1 RETURNING *",
        [id]
    )

    if (resultado.rowCount === 0) {
        return res.status(404).json({
            mensagem: "Pessoa não encontrada"
        })
    }

    res.status(204).send()
})

app.put("/pessoas/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { nome, idade, profissao } = req.body

    const resultado = await pool.query(
        `UPDATE pessoas
         SET nome = $1, idade = $2, profissao = $3
         WHERE id = $4
         RETURNING *`,
        [nome, idade, profissao, id]
    )

    if (resultado.rowCount === 0) {
        return res.status(404).json({
            mensagem: "Pessoa não encontrada"
        })
    }

    res.json(resultado.rows[0])
})

