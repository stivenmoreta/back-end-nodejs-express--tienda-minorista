const pool = require("../db");

/**
 * Productos disponibles en la tienda
 */
const getProductosDisponibles = async (req, res) => {
  const allProductos = await pool.query(
    `SELECT fk_id_categoria,id_producto, nombre_producto, precio_producto, stock_producto 
    FROM "PRODUCTO" WHERE eliminado = false and stock_producto > 0`
  );
  res.json(allProductos.rows);
};

/**
 * Productos registrados y que no estan eliminados para el usuario gestor
 */
const getProductosRegistrados = async (req, res) => {
  const allProductos = await pool.query(
    'SELECT id_producto, nombre_producto, precio_producto, stock_producto, eliminado FROM "PRODUCTO" where eliminado = false'
  );
  res.json(allProductos.rows);
};

/**
 * Producto que se desea buscar
 * @param {*} req.params id_producto que se desea buscar
 */
const getProducto = async (req, res) => {
  const { id_producto } = req.params;
  const producto = await pool.query(
    'SELECT nombre_producto, precio_producto, stock_producto FROM "PRODUCTO" WHERE id_producto= $1',
    [id_producto]
  );
  res.json(producto.rows[0]);
};

/**
 * agregar nuevos productos
 * @param {*} req.body ingresar datos del producto que se desea agregar
 */
const createProducto = async (req, res) => {
  const { fk_id_categoria, nombre_producto, precio_producto, stock_producto } =
    req.body;
  const newProducto = await pool.query(
    'INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto, precio_producto, stock_producto) VALUES ($1,$2,$3,$4)',
    [fk_id_categoria, nombre_producto, precio_producto, stock_producto]
  );
  res.json(newProducto.rows);
};

/**
 *
 * @param {*} req.params id_producto que se deasea actualizar
 * @param {*} req.body informacion del producto que se desea actualizar
 */
const updateProducto = async (req, res) => {
  const { id_producto } = req.params;
  const { fk_id_categoria, nombre_producto, precio_producto, stock_producto } = req.body;
  const allproductos = await pool.query(
    `UPDATE "PRODUCTO" SET fk_id_categoria=$1, nombre_producto=$2, precio_producto=$3, stock_producto=$4 
    WHERE id_producto=$5 RETURNING *`,
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

/**
 * producto a eliminar
 * @param {*} req.params id_producto que se desea eliminar
 */
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

/**
 * recuperacion del producto eliminado
 * @param {*} req.params id_producto que se desea recuperar
 */
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
  activateProducto,
};
