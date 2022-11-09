const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mysql = require("../mysql").pool;

//RETORNA TODAS AS CATEGORIAS
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `SELECT Category.id_Category,
                            Category.Title,
                            Video.id_Video,
                            Video.Title,
                            Video.Description,
                            Video.Location,
                            Video.Url
                       FROM Category
                 INNER JOIN Video
                         ON Video.id_Video = Category.id_Video;`,
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          category: result.map((category) => {
            return {
              id_Category: category.id_Category,
              Title: category.Title,
              Video: {
                id_Video: category.id_Video,
                Title: category.Title,
                Description: category.Description,
                Location: category.Location,
                Url: category.Url,
              },
              request: {
                tipo: "GET",
                descricao: "Retorna os detalhes de uma categoria especifica",
                url: "http://localhost:3000/Categorys/" + category.id_Category,
              },
            };
          }),
        };
        return res.status(200).send(response);
      }
    );
  });
});

//CRIAR UMA CATEGORIA
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
        conn.query(
          "INSERT INTO Category (Title) VALUES (?)",
          [req.body.Title],
          (error, result, field) => {
            conn.release();
            if (error) {
              return res.status(500).send({ error: error });
            }
            const response = {
              mensagem: "Categoria criada com sucesso!",
              categoriaCriada: {
                id_Category: result.id_Category,
                Title: req.body.Title,
                request: {
                  tipo: "GET",
                  descricao: "Retorna todas as categorias",
                  url: "http://localhost:3000/Categorys",
                },
              },
            };
            return res.status(201).send(response);
          }
        );
      }
    );
  });

//RETORNA OS DADOS DE UMA CATEGORIA
router.get("/:id_Category", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM Category WHERE id_Category = ?;",
      [req.params.id_Category],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: "Não foi encontrado um pedido com esse ID",
          });
        }
        const response = {
          category: {
            id_Category: result[0].id_Category,
            Title: result[0].Title,
            Video: {
              id_Video: result[0].id_Video,
              Title: result[0].Title,
              Description: result[0].Description,
              Location: result[0].Location,
              Url: result[0].Url,
            },
            request: {
              tipo: "GET",
              descricao: "Retorna todos as categorias",
              url: "http://localhost:3000/Categorys",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

//INSERE UM VIDEO EM UMA CATEGORIA
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM Video WHERE id_Video = ?",
      [req.body.id_Video],
      (error, result, field) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: "Video não encontrado",
          });
        }
        conn.query(
          "INSERT INTO pedidos (id_Produto, quantidade) VALUES (?,?)",
          [req.body.id_Produto, req.body.quantidade],
          (error, result, field) => {
            conn.release();
            if (error) {
              return res.status(500).send({ error: error });
            }
            const response = {
              mensagem: "Video inserido com sucesso!",
              videoInserido: {
                idpedido: result.idpedido,
                id_Produto: req.body.id_Produto,
                quantidade: req.body.quantidade,
                request: {
                  tipo: "GET",
                  descricao: "Retorna todos os pedidos",
                  url: "http://localhost:3000/pedidos",
                },
              },
            };
            return res.status(201).send(response);
          }
        );
      }
    );
  });
});

//DELETA UMA CATEGORIA
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM Category WHERE id_Category = ?",
      [req.body.id_Category],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Categoria removida com sucesso",
          request: {
            tipo: "POST",
            descricao: "insere uma categoria",
            url: "http://localhost:3000/Categorys",
            body: {
              id_Category: "String",
              Title: "String",
            },
          },
        };

        return res.status(202).send(response);
      }
    );
  });
});

//DELETA UM VIDEO DE UMA CATEGORIA
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM Category WHERE id_Category = ?",
      [req.body.id_Category],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Categoria removida com sucesso",
          request: {
            tipo: "POST",
            descricao: "insere uma categoria",
            url: "http://localhost:3000/Categorys",
            body: {
              id_Category: "String",
              Title: "String",
            },
          },
        };

        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
