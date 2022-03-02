const { Router } = require("express");
const {
  getBoletas,
  getBoleta,
  newBoleta,
} = require("../controllers/boletas.controller");
const { verifyToken, isGestor } = require("../middlewares/auth.jwt");

const router = Router();

router.get("/",[verifyToken, isGestor], getBoletas);
router.get("/:id_cliente/:num_boleta", getBoleta);
router.post("/comprar", [verifyToken, isGestor], newBoleta);

module.exports = router;
