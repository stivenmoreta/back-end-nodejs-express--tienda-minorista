const router = require("express").Router();

const {
  getCategorias,
  getCategoria,
  updateCategoria,
  createCategoria,
} = require("../controllers/categorias.controller");
const { verifyToken, isGestor } = require("../middlewares/auth.jwt");

router.get("/", getCategorias);
router.get("/:id_categoria", getCategoria);
router.put("/:id_categoria", [verifyToken, isGestor], updateCategoria);
router.post("/", [verifyToken, isGestor], createCategoria);

module.exports = router;
