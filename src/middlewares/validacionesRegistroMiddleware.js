const { check } = require("express-validator");

const fechaActual = new Date();
const anioActual = fechaActual.getFullYear();
const mesActual = fechaActual.getMonth();
const diaActual = fechaActual.getDate();
const fechaDeseada = new Date(
  anioActual - 18,
  mesActual,
  diaActual
).toDateString();

const validacionesRegistro = [
  check("nombre").notEmpty().withMessage("Debes ingresar un nombre"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .isEmail()
    .withMessage("Debesingresar un email valido"),
  check("fecha")
    .notEmpty()
    .withMessage("Debes ingresar tu fecha de nacimiento")
    .isBefore(fechaDeseada)
    .withMessage("Debes ser mayor de edad"),
  check("pais").notEmpty().withMessage("Debes ingresar un pais"),
  check("ciudad").notEmpty().withMessage("Debes ingresar una ciudad"),
  check("direccion").notEmpty().withMessage("Debes ingresar una direccion"),
  check("contrasena")
    .notEmpty()
    .withMessage("Debes ingresar una contraseña")
    .isLength({ min: 5, max: 12 })
    .withMessage("La contraseña debe tener entre 5 y 12 caracteres"),
];

module.exports = validacionesRegistro;
