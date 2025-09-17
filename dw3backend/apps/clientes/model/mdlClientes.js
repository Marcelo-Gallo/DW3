const db = require("../../../database/databaseConfig");

// ANTES: GetAllCursos
const getAllClientes = async () => {
  return (
    await db.query(
      // ALTERADO: Tabela e ordenação
      "SELECT * FROM clientes where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

// ANTES: GetCursoByID
const getClienteByID = async (clienteIDPar) => {
  return (
    await db.query(
      // ALTERADO: Tabela, chave primária e parâmetro
      "SELECT * FROM clientes WHERE clienteid = $1 and deleted = false ORDER BY nome ASC",
      [clienteIDPar]
    )
  ).rows;
};

// ANTES: InsertCursos
const insertClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        // ALTERADO: Tabela, colunas e valores. Note que é mais seguro listar as colunas.
        "INSERT INTO clientes (codigo, nome, endereco, ativo, deleted) " + 
        "values($1, $2, $3, $4, false)",
        [
          registroPar.codigo,
          registroPar.nome,
          registroPar.endereco,
          registroPar.ativo,
        ]
      )
    ).rowCount;
  } catch (error) {
    // ALTERADO: Mensagem de erro para o contexto de clientes
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// ANTES: UpdateCursos
const updateClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        // ALTERADO: Tabela, colunas e chave primária
        "UPDATE clientes SET " +
          "codigo = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "ativo = $5 " +          
          "WHERE clienteid = $1",
        [
            registroPar.clienteid,
            registroPar.codigo,
            registroPar.nome,
            registroPar.endereco,
            registroPar.ativo,        
        ]
      )
    ).rowCount;
  } catch (error) {
    // ALTERADO: Mensagem de erro para o contexto de clientes
    msg = "[mdlClientes|UpdateClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// ANTES: DeleteCursos
const deleteClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
    await db.query(
      // ALTERADO: Tabela e chave primária
      "UPDATE clientes SET deleted = true WHERE clienteid = $1",
      [registroPar.clienteid] // Usando diretamente o ID do cliente
    )
  ).rowCount;
} catch (error) {
  // ALTERADO: Mensagem de erro para o contexto de clientes
  msg = "[mdlClientes|DeleteClientes] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  // ALTERADO: Nomes das funções exportadas
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  deleteClientes,
};