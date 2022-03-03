const pool = require("../db");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

/**
 * crea un nuevo usuario
 * @param {*} req.body Datos necesarios para la creaccion del usuario
 */
const createNewUsuario = async (req, res) => {
  const {
    rut_usuario,
    digito_verficador_usuario,
    p_nombre_usuario,
    s_nombre_usuario,
    apellido_p_usuario,
    apellido_m_usuario,
    correo_electronico_usuario,
    numero_tel_cel_usuario,
    id_rol,
  } = req.body;

  //contraseña creada automaticamente con datos de registro
  const contrasena_usuario = `@${s_nombre_usuario.substring(
    0,
    2
  )}-A${digito_verficador_usuario}-S${rut_usuario.substring(3, 3)}`;
  //contraseña creada encriptada
  const salt = await bcrypt.genSalt(10);
  const crypt_contrasena_usuario = await bcrypt.hash(contrasena_usuario, salt);

  //nick creado automaticamente
  const nick_usuario = `${p_nombre_usuario.substring(
    0,
    2
  )}${correo_electronico_usuario.substring(
    2,
    4
  )}${numero_tel_cel_usuario.substring(1, 4)}`;

  const newUsuario = await pool.query(
    `
    INSERT INTO "USUARIO"(  rut_usuario,
                            digito_verificador_usuario,
                            p_nombre_usuario,
                            s_nombre_usuario,
                            apellido_p_usuario,
                            apellido_m_usuario,
                            correo_electronico_usuario,
                            numero_tel_cel_usuario,
                            contrasena_usuario,
                            nick_usuario)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id_usuario,rut_usuario,s_nombre_usuario,apellido_m_usuario;
    `,
    [
      rut_usuario,
      digito_verficador_usuario,
      p_nombre_usuario,
      s_nombre_usuario,
      apellido_p_usuario,
      apellido_m_usuario,
      correo_electronico_usuario,
      numero_tel_cel_usuario,
      crypt_contrasena_usuario,
      nick_usuario,
    ]
  );

  const {
    id_usuario:new_id_usuario,
    rut_usuario: new_rut_usuario,
    s_nombre_usuario: new_s_nombre_usuario,
    apellido_m_usuario: new_apellido_m_usuario,
  } = newUsuario.rows[0];

  await pool.query(
    `INSERT INTO "USU_X_ROL"(fk_id_usuario,fk_id_rol) VALUES($1,$2)`,
    [new_id_usuario, id_rol]
  );

  const token = jwt.sign(
    {
      id: new_rut_usuario,
      id2: new_s_nombre_usuario,
      id3: new_apellido_m_usuario,
      id4: id_rol
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 3600, // 1 hora de dureacion del token
    }
  );

  res.json({ token, nick_usuario, contrasena_usuario });
};

/**
 * Genera token para autentificarse en funciones que lo necesitan
 * @param {*} req.body nick y contraseña para logearse
 */
const loginUsuario = async (req, res) => {
  const { nick_usuario, contrasena_usuario } = req.body;
  const usuarioFound = await pool.query(
    `SELECT contrasena_usuario,rut_usuario,s_nombre_usuario,apellido_m_usuario,id_usuario FROM "USUARIO" WHERE nick_usuario = $1 `,
    [nick_usuario]
  );
  if (usuarioFound.rows.length === 0)
    return res.status(400).json({ message: "Usuario no encontrado" });
  
  const {contrasena_usuario:compare_contrasena_usuario,rut_usuario,s_nombre_usuario,apellido_m_usuario,id_usuario} = usuarioFound.rows[0]

  const matchContrasena = await bcrypt.compare(
    contrasena_usuario,
    compare_contrasena_usuario
  );
  if (!matchContrasena)
    return res
      .status(401)
      .json({ token: null, message: "contraseña invalida" });

  const UXR = await pool.query('SELECT fk_id_rol FROM "USU_X_ROL" WHERE fk_id_usuario = $1',[id_usuario])


  const token = jwt.sign(
    {
      id: rut_usuario,
      id2: s_nombre_usuario,
      id3: apellido_m_usuario,
      id4: UXR.rows[0].fk_id_rol
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 3600, // 1 hora de dureacion del token
    }
  );

  res.json({ token });
};

module.exports = {
  createNewUsuario,
  loginUsuario,
};
