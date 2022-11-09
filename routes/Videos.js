const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mysql = require("../mysql").pool;


//RETORNA TODOS OS VIDEOS
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM Video;", (error, result, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        Videos: result.map((vid) => {
          return {
            id_Video: vid.id_Video,
            Title: vid.Title,
            Description: vid.Description,
            Location: vid.Location,
            Url: vid.Url,
            request: {
              tipo: "GET",
              descricao: "Retorna os detalhes de um video especifico",
              url: "http://localhost:3000/Videos/" + vid.id_Video,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});

//INSERE UM VIDEO
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO Video (Title, Description, Location, Url) VALUES (?,?,?,?)",
      [req.body.Title, req.body.Description,req.body.Location, req.body.Url],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Video inserido com sucesso!",
          videoCriado: {
            id_Video: result.id_Video,
            Title: req.body.Title,
            Description: req.body.Description,
            Location: req.body.Location,
            Url: req.body.Url,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os videos",
              url: "http://localhost:3000/Videos",
            },
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});

//RETORNA OS DADOS DE UM VIDEO
router.get("/:id_Video", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM Video WHERE id_Video = ?;",
      [req.params.id_Video],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: "Não foi encontrado um produto com esse ID",
          });
        }
        const response = {
          Video: {
            id_Video: result[0].id_Video,
            Title: result[0].Title,
            Description: result[0].Description,
            Location: result[0].Location,
            Url: result[0].Url,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os videos",
              url: "http://localhost:3000/Videos",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

//ALTERA UM VIDEO
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE Video
          SET Title = ?,
              Description = ?,
              Location = ?,
              Url = ?
        WHERE id_Video = ?`,
      [req.body.Title, req.body.Description, req.body.Location, req.body.Url, req.body.id_produto],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Video atualizado com sucesso!",
          videoAtualizado: {
            id_Video: req.body.id_Video,
            Title: req.body.Title,
            Description: req.body.Description,
            Location: req.body.Location,
            Url: req.body.Url,
            request: {
              tipo: "GET",
              descricao: "Retorna os detalhes de um video especifico",
              url: "http://localhost:3000/Videos/" + req.body.id_Video,
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

//DELETA UM VIDEO
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM Video WHERE id_Video = ?",
      [req.body.id_Video],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Video removido com sucesso",
          request: {
            tipo: "POST",
            descricao: "insere um Video",
            url: "http://localhost:3000/Videos",
            body: {
              Title: "String",
              Description: "String",
              Location: "String",
              Url: "String"
            },
          },
        };

        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
