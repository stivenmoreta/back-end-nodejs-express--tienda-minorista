const pool = require("../db");

const getBoletas = async (req, res) => {
  const allBoletas = await pool.query('SELECT * FROM "BOLETA"');
  res.json(allBoletas.rows);
};

const getMisBoletas = async (req, res) => {
  const { id_cliente } = req.headers;
  const allBoletas = await pool.query(
    'SELECT * FROM "BOLETA" WHERE fk_id_cliente = $1',
    [id_cliente]
  );
  res.json(allBoletas.rows);
};

const getBoleta = async (req, res) => {
  const { id_cliente, num_boleta } = req.params;
  const boleta = await pool.query(
    `
    SELECT  CLI.nombre_cliente ||' '|| CLI.apellido_cliente as nombre_completo,
            B.num_boleta,
            B.fecha,
            PR.nombre_producto,
            D.cantidad,
            D.precio,
            D.cantidad * D.precio as total
    FROM "CLIENTE" AS CLI LEFT JOIN "BOLETA" AS B ON(CLI.id_cliente=B.fk_id_cliente)
                          LEFT JOIN "DETALLE" AS D ON(B.num_boleta =D.fk_num_boleta)
                          LEFT JOIN "PRODUCTO" AS PR ON(D.fk_id_producto = PR.id_producto)
    GROUP BY cli.id_cliente,CLI.nombre_cliente,CLI.apellido_cliente,B.num_boleta,PR.nombre_producto,D.cantidad,D.precio,D.num_detalle
    HAVING CLI.id_cliente = $1 AND B.num_boleta = $2
    ORDER BY D.num_detalle asc
    `,
    [id_cliente, num_boleta]
  );
  res.json(boleta.rows);
};

const newBoleta = async (req, res) => {
  try {
    const { id_cliente } = req.headers;
    const comprar = req.body;
    console.log(comprar);
    console.log(id_cliente);
    //retorar el num de la boleta para poder usarla en el detalle
    const newBoleta = await pool.query(
      `INSERT INTO "BOLETA"(fk_id_cliente,fecha)
    VALUES ($1,NOW()) RETURNING num_boleta;`,
      [id_cliente]
    );
    const { num_boleta } = newBoleta.rows[0];
    console.log(num_boleta);
    console.log(comprar.length);

    for (let index = 0; index < comprar.length; index++) {
      console.log(index);
      const { num_detalle, id_producto, cantidad, precio } = comprar[index];
      const resultado = await pool.query(
        `
      INSERT INTO "DETALLE"(num_detalle,fk_num_boleta,fk_id_producto,cantidad,precio)
      VALUES ($1,$2,$3,$4,$5);`,
        [num_detalle, num_boleta, id_producto, cantidad, precio]
      );
    }
  } catch (err) {
    console.log(err);
  }
  res.status(201).json("Se ingreso correctamente la compra");
};

module.exports = {
  getBoletas,
  getMisBoletas,
  getBoleta,
  newBoleta,
};
