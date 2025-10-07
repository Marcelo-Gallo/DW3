//@ importando as bibliotecas

const express = require("express")
require("dotenv").config();

//@ Configura o servidor
const app = express();
const port = process.env.PORT;

//@ Criando uma rota para o endereço raiz.
app.get("/", (req, res) => {
  res.send("Hello DW3!")
})

//@ iniciando o servidor
app.listen(port, () => {
  console.log("Executando a aplicação:", process.env.APP_NAME);
  console.log("Aplicação exemplo ouvindo na porta:", port);
})
