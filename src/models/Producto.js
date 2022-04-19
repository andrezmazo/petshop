const fs = require("fs");
const db = require("../database/models");
const path = require("path");
const e = require("express");

const Producto = {
  listaProductos: async function (req, res) {
    try {
      const productos = await db.Producto.findAll({ include: ["tipo"] });
      return res.send(productos);
    } catch (error) {
      return error;
    }
  },
  listaAlimentos: async (req, res) => {
    try {
      const alimentos = await db.Producto.findAll({
        where: { tipo_id: 1 },
        include: ["tipo"],
      });
      return alimentos;
    } catch {
      return error;
    }
  },
  crearProducto: async (req, res) => {
    const { id, nombre, imagen, descripcion, precio, tipo } = req.body;

    const productoCreado = {
      id: id,
      nombre: nombre,
      imagen: imagen,
      descripcion: descripcion,
      precio: precio,
      tipo: tipo,
    };
    await db.Producto.create(productoCreado);
    res.redirect("/listaProductos");
  },
};
module.exports = Producto;
