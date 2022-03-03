const { Router } = require("express");
const {
  getBoletas,
  getMisBoletas,
  getBoleta,
  newBoleta,
} = require("../controllers/boletas.controller");
const { verifyToken, isGestor } = require("../middlewares/auth.jwt");
const router = Router();

router.get("/", [verifyToken, isGestor], getBoletas); //-
router.get("/misboletas", verifyToken, getMisBoletas); //--
router.get("/:id_cliente/:num_boleta", [verifyToken], getBoleta); //-
router.post("/comprar", [verifyToken], newBoleta); //-

module.exports = router;
