// ALTERADO: Importar o model correto
const mdlClientes = require("../model/mdlClientes");

// ANTES: GetAllCursos
const getAllClientes = (req, res) =>
  (async () => {
    // ALTERADO: Chamar a função do model de clientes
    let registro = await mdlClientes.getAllClientes();
    res.json({ status: "ok", registro: registro });
  })();

// ANTES: GetCursoByID
const getClienteByID = (req, res) =>
  (async () => {
    // ALTERADO: Parâmetro para clienteid
    const clienteID = parseInt(req.body.clienteid);
    // ALTERADO: Chamar a função do model de clientes
    let registro = await mdlClientes.getClienteByID(clienteID);
    res.json({ status: "ok", registro: registro });
  })();

// ANTES: InsertCursos
const insertClientes = (request, res) =>
  (async () => {
    const registro = request.body;
    // ALTERADO: Chamar a função do model de clientes
    let { msg, linhasAfetadas } = await mdlClientes.insertClientes(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// ANTES: UpdateCursos
const updateClientes = (request, res) =>
  (async () => {
    const registro = request.body;
    // ALTERADO: Chamar a função do model de clientes
    let { msg, linhasAfetadas } = await mdlClientes.updateClientes(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// ANTES: DeleteCursos
const deleteClientes = (request, res) =>
  (async () => {
    const registro = request.body;
    // ALTERADO: Chamar a função do model de clientes
    let { msg, linhasAfetadas } = await mdlClientes.deleteClientes(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  // ALTERADO: Nomes das funções exportadas
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  deleteClientes,
};