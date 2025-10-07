const axios = require("axios");
const moment = require("moment"); // Adicionado para manter o padrão

// Padronizado com base em 'manutAlunos'
const manutCursos = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de cursos
    const { userName, token } = req.session;
    let remoteMSG = null;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error.message;
      }
      res.render("cursos/view/vwManutCursos.njk", {
        title: "Manutenção de Cursos",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de Cursos",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

// Padronizado com base em 'insertAlunos'
const insertCursos = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      return res.render("cursos/view/vwFCrCursos.njk", {
        title: "Cadastro de Cursos",
        erro: null,
      });

    } else {
      //@ POST
      const regData = req.body;
      const { token } = req.session;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertCursos", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
        });

        res.json({
          status: response.data.status,
          msg: "Curso inserido com sucesso!",
        });
      } catch (error) {
        console.error('Erro ao inserir curso no backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
        });
      }
    }
  })();

// Padronizado com base em 'ViewAlunos'
const ViewCursos = async (req, res) =>
  (async () => {
    const { userName, token } = req.session;
    try {
      const { id } = req.params;
      
      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/GetCursoByID",
        { cursoid: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status == "ok") {
        res.render("cursos/view/vwFRUDrCursos.njk", {
          title: "Visualização de Curso",
          data: response.data.registro[0],
          disabled: true,
          userName: userName,
        });
      } else {
        console.log("[ctlCursos.js|ViewCursos] ID de curso não localizado!");
      }
    } catch (error) {
      console.log("[ctlCursos.js|ViewCursos] Try Catch: Erro não identificado", error);
    }
  })();

// Padronizado com base em 'UpdateAluno'
const UpdateCurso = async (req, res) =>
  (async () => {
    const { userName, token } = req.session;
    try {
      if (req.method == "GET") {
        const { id } = req.params;

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/GetCursoByID",
          { cursoid: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Atualização de Curso",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlCursos.js|UpdateCurso] Curso não localizado");
        }
      } else {
        //@ POST
        const regData = req.body;
        
        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateCursos", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
          });

          res.json({
            status: response.data.status,
            msg: "Curso atualizado com sucesso!",
          });
        } catch (error) {
          console.error('[ctlCursos.js|UpdateCurso] Erro ao atualizar curso:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
          });
        }
      }
    } catch (error) {
      console.log("[ctlCursos.js|UpdateCurso] Try Catch: Erro não identificado", error);
    }
  })();

// Padronizado com base em 'DeleteAluno'
const DeleteCurso = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const { token } = req.session;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteCursos", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });

      res.json({
        status: response.data.status,
        msg: "Curso removido com sucesso!",
      });
    } catch (error) {
      console.error('[ctlCursos.js|DeleteCurso] Erro ao deletar curso:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
      });
    }
  })();

module.exports = {
  manutCursos,
  insertCursos,
  ViewCursos,
  UpdateCurso,
  DeleteCurso,
};