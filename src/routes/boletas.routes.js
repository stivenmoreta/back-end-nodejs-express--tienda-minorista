const { Router } = require("express");
const {
  getBoletas,
  getBoleta,
  newBoleta,
} = require("../controllers/boletas.controller");

const router = Router();

router.get("/", getBoletas);
router.get("/:id_cliente/:num_boleta", getBoleta);
router.post("/comprar", newBoleta);

module.exports = router;
