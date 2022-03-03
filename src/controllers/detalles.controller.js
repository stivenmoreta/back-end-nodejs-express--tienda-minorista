const pool = require("../db");

const updateDetalle = async (req, res) => {
  const { num_detalle, fk_num_boleta } = req.params;
  const { new_fk_id_producto, new_cantidad, new_precio } = req.body;

  const oldDetalle = await pool.query(
    `
    SELECT fk_id_producto, cantidad, precio FROM "DETALLE" WHERE num_detalle=$1 and fk_num_boleta=$2
  `,
    [num_detalle, fk_num_boleta]
  );

  const {
    fk_id_producto: old_fk_id_producto,
    cantidad: old_cantidad,
    precio: old_precio,
  } = oldDetalle.rows[0];

  const detalleActualizado = await pool.query(
    `UPDATE "DETALLE" SET fk_id_producto=$1,cantidad=$2, precio=$3 WHERE num_detalle=$4 and fk_num_boleta=$5 RETURNING *`,
    [
      new_fk_id_producto.length === 0 ? old_fk_id_producto : new_fk_id_producto,
      new_cantidad > 0 ? new_cantidad : old_cantidad,
      new_precio > 0 ? new_precio : old_precio,
      num_detalle,
      fk_num_boleta,
    ]
  );

  res.json(detalleActualizado.rows[0]);
};

module.exports = { updateDetalle };
