//@ Importa as bibliotecas e arquivos
const express = require("express");
const routerApp = express.Router();
const appHello = require("../controller/ctlHello");

//@ configura as rotas
routerApp.get("/", appHello.hello);
routerApp.post("/helloUser", appHello.helloUser);

//@ exporta a variávell com as rotas
module.exports = routerApp;