const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

//import rutas
const productoRoutes = require("./routes/productos.routes");
const boletaRoutes = require("./routes/boletas.routes");
const clienteRoutes = require("./routes/clientes.routes");
const usuarioRoutes = require("./routes/usuarios.routes");
const categoriaRoutes = require("./routes/categorias.routes");
const detalleRoutes = require("./routes/detalles.routes");

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/categoria", categoriaRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/detalle", detalleRoutes);
app.use("/api/boleta", boletaRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/usuario", usuarioRoutes);
// handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
