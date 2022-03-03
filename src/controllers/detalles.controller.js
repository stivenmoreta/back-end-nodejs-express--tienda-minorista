const pool = require("../db");

const updateDetalle = async (req, res) => {
  const { num_detalle, fk_num_boleta } = req.params;
  const { new_fk_num_boleta, fk_id_producto, cantidad, precio } = req.body;
  const detalleActualizado = await pool.query(
    `UPDATE "DETALLE" SET fk_num_boleta=$1, fk_id_producto=$2,cantidad=$3, precio=$4 WHERE num_detalle=$5 and fk_num_boleta=$6`,
    [
      new_fk_num_boleta,
      fk_id_producto,
      cantidad,
      precio,
      num_detalle,
      fk_num_boleta,
    ]
  );
  res.json(detalleActualizado.rows);
};

module.exports = { updateDetalle };
