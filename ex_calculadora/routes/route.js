const express = require("express");
const routerApp = express.Router();
const appCalc = require("../controllers/ctlCalculadora");

routerApp.post("/calculadora", appCalc.calc);

module.exports = routerApp;