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

app.use(express.json()) // habilita a leitura json

/*
app → nossa aplicação Express
.listen() → manda o servidor começar a "escutar"
3000 → a porta onde ele vai ficar disponível
 */

app.listen(3000)


const pessoas = [
    {
        id: 1,
        nome: "Guilherme",
        idade: 29,
        profissao: "Programador"
    },
    {
        id: 2,
        nome: "João",
        idade: 12,
        profissao: "Estudante"
    }
]

app.get("/", (req, res) => {
    res.send("Servidor fundionando")
})

app.get("/pessoas", (req, res) => {
    res.json(pessoas) //Converte para JSON
}
)

app.post("/pessoas", (req, res) => {
    const novoId = pessoas[pessoas.length - 1].id + 1 // provisório até entrar de vez com o Banco de dados

    //Usar spread (...)
    const novaPessoa = {
        ...req.body,
        id: novoId
        
    }
    pessoas.push(novaPessoa)
    console.log(req.body)
    res.send("Pessoa Recebida")
})

