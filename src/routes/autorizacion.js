const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacionController");
const multer = require("multer");
const path = require("path");

//LOGIN
router.get("/login", autorizacionController.renderLogin);

router.post("/login", autorizacionController.procesarLogin);

//LOGOUT
router.get("/logout", autorizacionController.cerrarSesion);

router.get("/register", autorizacionController.renderRegistro);

module.exports = router;
