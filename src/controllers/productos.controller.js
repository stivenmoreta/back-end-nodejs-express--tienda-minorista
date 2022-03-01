const pool = require("../db");

const getProductos = async (req, res) => {
  const allProductos = await pool.query(
    'SELECT id_producto, nombre_producto, precio_producto, stock_producto FROM "PRODUCTO"'
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
  const { fk_id_categoria, nombre_producto, precio_producto, stock_producto } = req.body;
  const newProducto = await pool.query(
    'INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto, precio_producto, stock_producto) VALUES ($1,$2,$3,$4)',
    [fk_id_categoria, nombre_producto, precio_producto, stock_producto]
  );
  res.json(newProducto.rows);
};
const updateProducto = async (req, res) => {
  const {fk_id_categoria,nombre_producto,precio_producto,stock_producto,id_producto} = req.body
  const allproductos = await pool.query(
  'UPDATE "PRODUCTO" SET fk_id_categoria=$1, nombre_producto=$2, precio_producto=$3, stock_producto=$4 WHERE id_producto=$5',
  [fk_id_categoria,nombre_producto,precio_producto,stock_producto,id_producto]
  );
  res.json(allproductos.rows);
};

const deleteProducto = async (req, res) => {
  /*agregar estado al producto, para borrarlo, solo cambia el estado*/
  const allproductos = await pool.query("SELECT * FROM producto");
  res.json(allproductos.rows);
};

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
};
