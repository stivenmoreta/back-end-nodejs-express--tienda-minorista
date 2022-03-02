const pool = require("../db");

const getProductosDisponibles = async (req, res) => {
  const allProductos = await pool.query(
    'SELECT id_producto, nombre_producto, precio_producto, stock_producto FROM "PRODUCTO" WHERE eliminado = false and stock_producto > 0'
  );
  res.json(allProductos.rows);
};
const getProductosRegistrados = async (req, res) => {
  const allProductos = await pool.query(
    'SELECT id_producto, nombre_producto, precio_producto, stock_producto, eliminado FROM "PRODUCTO" where eliminado = false'
  );
  res.json(allProductos.rows);
};

const getProducto = async (req, res) => {
  const { id_producto } = req.params;
  const producto = await pool.query(
    'SELECT nombre_producto, precio_producto, stock_producto FROM "PRODUCTO" WHERE id_producto= $1',
    [id_producto]
  );
  res.json(producto.rows[0]);
};
const createProducto = async (req, res) => {
  const { fk_id_categoria, nombre_producto, precio_producto, stock_producto } =
    req.body;
  const newProducto = await pool.query(
    'INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto, precio_producto, stock_producto) VALUES ($1,$2,$3,$4)',
    [fk_id_categoria, nombre_producto, precio_producto, stock_producto]
  );
  res.json(newProducto.rows);
};
const updateProducto = async (req, res) => {
  const { id_producto } = req.params;
  const { fk_id_categoria, nombre_producto, precio_producto, stock_producto } =
    req.body;
  const allproductos = await pool.query(
    'UPDATE "PRODUCTO" SET fk_id_categoria=$1, nombre_producto=$2, precio_producto=$3, stock_producto=$4 WHERE id_producto=$5',
    [
      fk_id_categoria,
      nombre_producto,
      precio_producto,
      stock_producto,
      id_producto,
    ]
  );
  res.json(allproductos.rows);
};

const deleteProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const deleteProducto = await pool.query(
      `UPDATE "PRODUCTO" SET eliminado = true
    WHERE id_producto = $1 RETURNING id_producto,nombre_producto`,
      [id_producto]
    );
    res.json(deleteProducto.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const activateProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const deleteProducto = await pool.query(
      `UPDATE "PRODUCTO" SET eliminado = false
    WHERE id_producto = $1 RETURNING id_producto,nombre_producto`,
      [id_producto]
    );
    res.json(deleteProducto.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductosDisponibles,
  getProductosRegistrados,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
  activateProducto
};
