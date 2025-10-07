// ALTERADO: Importar o model correto
const mdlPedidos = require("../model/mdlPedidos");

// ANTES: getAllClientes
const getAllPedidos = (req, res) =>
  (async () => {
    // ALTERADO: Chamar a função do model de pedidos
    let registro = await mdlPedidos.getAllPedidos();
    res.json({ status: "ok", registro: registro });
  })();

// ANTES: getClienteByID
const getPedidoByID = (req, res) =>
  (async () => {
    // ALTERADO: Parâmetro para pedidoid
    const pedidoID = parseInt(req.body.pedidoid);
    // ALTERADO: Chamar a função do model de pedidos
    let registro = await mdlPedidos.getPedidoByID(pedidoID);
    res.json({ status: "ok", registro: registro });
  })();

// ANTES: insertClientes
const insertPedidos = (request, res) =>
  (async () => {
    const registro = request.body;
    // ALTERADO: Chamar a função do model de pedidos
    let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// ANTES: updateClientes
const updatePedidos = (request, res) =>
  (async () => {
    const registro = request.body;
    // ALTERADO: Chamar a função do model de pedidos
    let { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// ANTES: deleteClientes
const deletePedidos = (request, res) =>
  (async () => {
    const registro = request.body;
    // ALTERADO: Chamar a função do model de pedidos
    let { msg, linhasAfetadas } = await mdlPedidos.deletePedidos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  // ALTERADO: Nomes das funções exportadas
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};