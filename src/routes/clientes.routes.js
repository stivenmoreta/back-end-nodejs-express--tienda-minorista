const { Router } = require("express");
const {
  createNewCliente,
  loginCliente,
} = require("../controllers/clientes.controller");

const router = Router();

router.get("/register", createNewCliente);
router.get("/login", loginCliente);


module.exports = router;