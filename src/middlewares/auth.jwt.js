const jwt = require("jsonwebtoken");
const pool = require("../db");

/**
 * verificador de tokens
 * @param {*} req.headers necesita un token para entrar a rutas protegidas
 * @returns
 */
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "Ingrese un token" });
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    let user = {};
    if (Object.keys(decoded).length === 6) {
      user = await pool.query(
        `SELECT * FROM "USUARIO" WHERE rut_usuario = $1 `,
        [decoded.id]
      );
      req.id_rol = decoded.id4;
      console.log("usuario");
    } else {
      user = await pool.query(
        `SELECT * FROM "CLIENTE" WHERE rut_cliente = $1`,
        [decoded.id]
      );
      console.log("cliente");
    }

    if (user.rows.length === 0)
      return res
        .status(404)
        .json({ message: "no se encontro usuario con este token" });

    next();
  } catch (error) {
    res.status(401).json({ message: "no autorizado" });
  }
};

const isAdmin = async (req, res, next) => {
  //encuentra el usuario con este id sacada del token
  const isAdmin = await pool.query(
    `SELECT nombre_rol FROM "ROL" WHERE id_rol = $1`,
    [req.id_rol]
  );
  if (isAdmin.rows[0].nombre_rol === "admin") {
    next();
  } else {
    res.status(401).json("acceso solo para administradores");
  }
};

const isGestor = async (req, res, next) => {
  //encuentra el usuario con este id sacada del token
  const isGestor = await pool.query(
    `SELECT nombre_rol FROM "ROL" WHERE id_rol = $1`,
    [req.id_rol]
  );

  if (isGestor.rows[0].nombre_rol === "gestor") {
    next();
  } else {
    res.status(401).json("acceso solo para usuario gestor");
  }
};

const isMarketing = async (req, res, next) => {
  //encuentra el usuario con este id sacada del token
  const isMarketing = await pool.query(
    `SELECT nombre_rol FROM "ROL" WHERE id_rol = $1`,
    [req.id_rol]
  );
  console.log(isMarketing.rows[0].nombre_rol);
  if (isMarketing.rows[0].nombre_rol === "marketing") {
    next();
  } else {
    res.status(401).json("acceso solo para usuario marketing");
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isGestor,
  isMarketing,
};
