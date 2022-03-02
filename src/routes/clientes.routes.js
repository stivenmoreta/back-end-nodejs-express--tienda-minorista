const { Router } = require("express");
const {
  createNewCliente,
  loginCliente,
} = require("../controllers/clientes.controller");

const router = Router();

router.post("/registration", createNewCliente);
router.post("/login", loginCliente);


module.exports = router;