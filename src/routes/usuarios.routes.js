const { Router } = require("express");
const {
  createNewUsuario,
  loginUsuario,
} = require("../controllers/usuarios.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.jwt");

const router = Router();

router.post("/register", [verifyToken, isAdmin], createNewUsuario); //--
router.post("/login", loginUsuario); //--

module.exports = router;
