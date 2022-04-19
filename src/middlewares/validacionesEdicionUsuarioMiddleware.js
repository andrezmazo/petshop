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

const validacionesEdicion = [
  check("nombre").notEmpty().withMessage("Debes ingresar un nombre"),
  check("fecha").isBefore(fechaDeseada).withMessage("Debes ser mayor de edad"),
  check("direccion").notEmpty().withMessage("Debes ingresar una direccion"),
];

module.exports = validacionesEdicion;
