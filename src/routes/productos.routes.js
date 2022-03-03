const router = require("express").Router();
const {
  getProductosDisponibles,
  getProductosRegistrados,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
  activateProducto,
} = require("../controllers/productos.controller");
const { verifyToken, isGestor } = require("../middlewares/auth.jwt");

router.get("/", getProductosDisponibles); //--
router.get("/registrados", [verifyToken, isGestor], getProductosRegistrados); //--
router.get("/:id_producto", getProducto); //--
router.post("/", [verifyToken, isGestor], createProducto); //--
router.patch("/:id_producto", [verifyToken, isGestor], updateProducto); //--
router.delete("/:id_producto", [verifyToken, isGestor], deleteProducto); //--
router.put("/activate/:id_producto", [verifyToken, isGestor], activateProducto); //--

module.exports = router;
