const { Router } = require("express");
const {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productos.controller");
const { verifyToken, isGestor } = require("../middlewares/auth.jwt");

const router = Router();

router.get("/", verifyToken, getProductos); //listo
router.get("/:id_producto", verifyToken, getProducto); //listo
router.post("/", [verifyToken, isGestor], createProducto); //listo
router.put(":id_producto", [verifyToken, isGestor], updateProducto); //listo
router.delete(":id_producto", [verifyToken, isGestor], deleteProducto);

module.exports = router;
