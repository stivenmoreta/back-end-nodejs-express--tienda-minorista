const pool = require("../db");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken");
const createNewCliente = async (req, res) => {
  const {
    rut_cliente,
    digito_verficador_cliente,
    nombre_cliente,
    apellido_cliente,
    correo_electronico_cliente,
    numero_tel_cel_cliente,
    contrasena_cliente,
    direccion_cliente,
  } = req.body;

  //numero de veces que itera la encriptacion(consume potencia, cuidado)
  const salt = await bcrypt.genSalt(10);
  const crypt_contrasena_cliente = await bcrypt.hash(contrasena_cliente, salt);
  const newCliente = await pool.query(
    `
    INSERT INTO "CLIENTE"(  rut_cliente,
                            digito_verificador_cliente,
                            nombre_cliente,
                            apellido_cliente,
                            correo_electronico_cliente,
                            numero_tel_cel_cliente,
                            contrasena_cliente,
                            direccion_cliente)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING rut_cliente;
    `,
    [
      rut_cliente,
      digito_verficador_cliente,
      nombre_cliente,
      apellido_cliente,
      correo_electronico_cliente,
      numero_tel_cel_cliente,
      crypt_contrasena_cliente,
      direccion_cliente,
    ]
  );

  const token = jwt.sign({ id: newCliente.rows[0].rut_cliente }, process.env.TOKEN_SECRET, {
    expiresIn: 3600, // 1 hora de dureacion del token
  });


  res.json({token});
};

const loginCliente = async (req, res) => {
  const {correo_electronico_cliente,contrasena_cliente} = req.body
  const correoFound = await pool.query(`SELECT contrasena_cliente,rut_cliente FROM "CLIENTE" WHERE correo_electronico_cliente = $1 `,[correo_electronico_cliente])
  if(correoFound.rows.length ===0 ) return  res.status(400).json({message: "Correo no encontrado"})
  
  const matchContrasena = await bcrypt.compare(contrasena_cliente, correoFound.rows[0].contrasena_cliente)
  if(!matchContrasena) return res.status(401).json({token: null, message:"contraseña invalida"})

  const token = jwt.sign({ id: correoFound.rows[0].rut_cliente }, process.env.TOKEN_SECRET, {
    expiresIn: 3600, // 1 hora de dureacion del token
  })

  res.json({token})  


};

module.exports = {
  createNewCliente,
  loginCliente,
};
