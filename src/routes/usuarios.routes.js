const { Router } = require("express");
const {
  createNewUsuario,
  loginUsuario,
} = require("../controllers/usuarios.controller");

const router = Router();

router.post("/register", createNewUsuario); //--
router.post("/login", loginUsuario); //--

module.exports = router;
