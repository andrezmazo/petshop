const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.renderIndex);
router.get("/productDetail/:id", productosController.renderDetalleProducto);
router.get("/listaProductos", productosController.renderListaProductos);
router.post("/listaProductos/crear", productosController.crearProducto);
router.get(
  "/listaProductos/:id/editar/",
  productosController.renderFormularioEdicion
);
router.put("/listaProductos/:id/editar/", productosController.editarProducto);
router.delete(
  "/listaProductos/:id/eliminar/",
  productosController.eliminarProducto
);
router.get("/productCart", productosController.renderCarrito);

router.get("/test", productosController.test);

module.exports = router;
