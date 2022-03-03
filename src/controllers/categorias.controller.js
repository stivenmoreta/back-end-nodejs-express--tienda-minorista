const pool = require("../db");

const getCategorias = async (req, res) => {
  const allCategorias = await pool.query(
    `SELECT id_categoria,nombre_categoria,descripccion_categoria FROM "CATEGORIA" `
  );

  res.json(allCategorias.rows);
};

const getCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const allCategorias = await pool.query(
    `SELECT nombre_categoria,descripccion_categoria FROM "CATEGORIA" where id_categoria=$1`,
    [id_categoria]
  );

  res.json(allCategorias.rows);
};

const updateCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nombre_categoria, descripccion_categoria } = req.body;
  const allCategorias = await pool.query(
    `UPDATE "CATEGORIA" SET nombre_categoria=$1, descripccion_categoria=$2 WHERE id_categoria=$3`,
    [nombre_categoria, descripccion_categoria, id_categoria]
  );

  res.json(allCategorias.rows);
};

const createCategoria = async (req, res) => {
  const { nombre_categoria, descripccion_categoria } = req.body;
  pool.query(
    `INSER INTO "CATEGORIA"(nombre_categoria, descripcion_categoria) VALUES($1, $2)`,
    [nombre_categoria, descripccion_categoria]
  );

  res.json("se guardo la categoria");
};

module.exports = {
  getCategorias,
  getCategoria,
  updateCategoria,
  createCategoria,
};
