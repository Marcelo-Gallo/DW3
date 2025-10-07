const db = require("../../../database/databaseConfig");

// ANTES: getAllClientes
const getAllPedidos = async () => {
  return (
    await db.query(
      // ALTERADO: Tabela e ordenação
      "SELECT * FROM pedidos where deleted = false ORDER BY data DESC"
    )
  ).rows;
};

// ANTES: getClienteByID
const getPedidoByID = async (pedidoIDPar) => {
  return (
    await db.query(
      // ALTERADO: Tabela, chave primária e parâmetro
      "SELECT * FROM pedidos WHERE pedidoid = $1 and deleted = false",
      [pedidoIDPar]
    )
  ).rows;
};

// ANTES: insertClientes
const insertPedidos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        // ALTERADO: Tabela e colunas (numero, data, valortotal, clienteid)
        "INSERT INTO pedidos (numero, data, valortotal, clienteid, deleted) " + 
        "values($1, $2, $3, $4, false)",
        [
          registroPar.numero,
          registroPar.data,
          registroPar.valortotal,
          registroPar.clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
    // ALTERADO: Mensagem de erro para o contexto de pedidos
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// ANTES: updateClientes
const updatePedidos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        // ALTERADO: Tabela, colunas e chave primária
        "UPDATE pedidos SET " +
          "numero = $2, " +
          "data = $3, " +
          "valortotal = $4, " +
          "clienteid = $5 " +          
          "WHERE pedidoid = $1",
        [
            registroPar.pedidoid,
            registroPar.numero,
            registroPar.data,
            registroPar.valortotal,
            registroPar.clienteid,        
        ]
      )
    ).rowCount;
  } catch (error) {
    // ALTERADO: Mensagem de erro para o contexto de pedidos
    msg = "[mdlPedidos|updatePedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// ANTES: deleteClientes
const deletePedidos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
    await db.query(
      // ALTERADO: Tabela e chave primária
      "UPDATE pedidos SET deleted = true WHERE pedidoid = $1",
      [registroPar.pedidoid]
    )
  ).rowCount;
} catch (error) {
  // ALTERADO: Mensagem de erro para o contexto de pedidos
  msg = "[mdlPedidos|deletePedidos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  // ALTERADO: Nomes das funções exportadas
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};