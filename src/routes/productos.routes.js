const { Router } = require("express");
const {
  getProductosDisponibles,
  getProductosRegistrados,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
  activateProducto
} = require("../controllers/productos.controller");
const { verifyToken, isGestor, isAdmin } = require("../middlewares/auth.jwt");

const router = Router();

router.get("/", verifyToken, getProductosDisponibles);
router.get("/registrados", [verifyToken,isGestor], getProductosRegistrados); //listo
router.get("/:id_producto", verifyToken, getProducto); //listo
router.post("/", [verifyToken, isGestor], createProducto); //listo
router.put("/:id_producto", [verifyToken, isGestor], updateProducto); //listo
router.delete("/:id_producto", [verifyToken,isGestor],deleteProducto);
router.put("/activate/:id_producto", [verifyToken,isGestor],activateProducto);

module.exports = router;
