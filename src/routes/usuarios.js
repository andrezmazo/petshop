const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const proteccionRutasUsuarioMiddleware = require("../middlewares/proteccionRutasUsuarioMiddleware");
const proteccionRutasAdminMiddleware = require("../middlewares/proteccionRutasAdminMiddleware");
const multer = require("multer");
const path = require("path");
const validacionesRegistro = require("../middlewares/validacionesRegistroMiddleware");
const validacionesEdicion = require("../middlewares/validacionesEdicionUsuarioMiddleware");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/users");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

router.get("/userProfile", usuariosController.renderPerfilUsuarioLoggeado);

router.post(
  "/userProfile/crear",
  upload.single("foto"),
  validacionesRegistro,
  usuariosController.crearUsuario
);

// Desde directorio de usuarios

router.get(
  "/listaUsuarios",
  proteccionRutasUsuarioMiddleware,
  proteccionRutasAdminMiddleware,
  usuariosController.renderListaUsuarios
);

router.get("/userProfile/:id", usuariosController.renderPerfilDesdeDirectorio);

router.get(
  "/userProfile/:id/editar/",
  usuariosController.renderFormularioEdicion
);

router.post(
  "/listaUsuarios/crear",
  upload.single("foto"),
  validacionesRegistro,
  usuariosController.crearUsuarioDesdeDirectorio
);

// Perfil y edicion de usuarios desde directorio

router.get(
  "/listaUsuarios/:id/editar/",
  usuariosController.renderFormularioEdicion
);

router.put(
  "/userProfile/:id/editar/",
  upload.single("foto"),
  validacionesEdicion,
  usuariosController.editarUsuarioDesdeDirectorio
);

//

router.delete(
  "/listaUsuarios/:id/eliminar/",
  usuariosController.eliminarUsuario
);

module.exports = router;
