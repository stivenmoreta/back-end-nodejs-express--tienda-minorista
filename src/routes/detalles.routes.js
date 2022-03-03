const router = require("express").Router();
const { updateDetalle } = require("../controllers/detalles.controller");
const { verifyToken, isGestor } = require("../middlewares/auth.jwt");

router.put(
  "/:num_detalle/:fk_num_boleta",
  [verifyToken, isGestor],
  updateDetalle
);

module.exports = router;
