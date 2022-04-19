const e = require("express");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productosDB.json");
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

// const alimentos = listaProductos.filter((i) => i.tipo === "alimento");
// const juguetes = listaProductos.filter((i) => i.tipo === "juguete");

const archivosImagen = listaProductos.map((i) => i.imagen);
const arrayIds = listaProductos.map((i) => i.id);

// BASE DE DATOS EN SEQUELIZE
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const { response } = require("express");

const Producto = require("../models/Producto");

const productosController = {
  crearProducto: async (req, res) => {
    const { nombre, imagen, descripcion, precio, tipo } = req.body;

    const productoCreado = {
      nombre: nombre,
      imagen: imagen,
      descripcion: descripcion,
      precio: precio,
      tipo_id: tipo,
    };
    await db.Producto.create(productoCreado);
    res.redirect("/listaProductos");
  },
  editarProducto: async function (req, res) {
    const idProducto = req.params.id;
    const { nombre, imagen, descripcion, precio, tipo } = req.body;

    const productoEditado = {
      nombre: nombre,
      imagen: imagen,
      descripcion: descripcion,
      precio: precio,
      tipo_id: tipo,
    };
    try {
      await db.Producto.update(productoEditado, {
        where: { id: idProducto },
      });
      res.redirect("/listaProductos");
      // return res.render("listaProductos");
    } catch (error) {
      return res.send(error);
    }
  },
  eliminarProducto: async function (req, res) {
    const idProducto = req.params.id;
    const listaFiltrada = listaProductos.filter(
      (elem) => elem.id != idProducto
    );
    try {
      db.Producto.destroy({ where: { id: idProducto }, force: false });
      return res.redirect("/listaProductos");
    } catch {
      res.send(error);
    }
  },
  renderFormularioEdicion: async function (req, res) {
    const idProducto = req.params.id;
    const productoAEditar = await db.Producto.findByPk(idProducto, {
      include: ["tipo"],
    });

    const listaProductos = await db.Producto.findAll({
      include: ["tipo"],
    });
    const archivosImagen = listaProductos.map((i) => i.imagen);
    // res.send(productoAEditar);
    res.render("editarProducto", {
      productoAEditar,
      archivosImagen,
    });
  },
  renderIndex: async function (req, res) {
    const alimentos = await db.Producto.findAll({
      where: { tipo_id: 1 },
      include: ["tipo"],
    });
    const juguetes = await db.Producto.findAll({
      where: { tipo_id: 2 },
      include: ["tipo"],
    });

    let numProductos = await db.Producto.findAll();
    let numPro = numProductos.length;

    // const alimentos = Producto.listaAlimentos();
    // const juguetes = Producto.listaJuguetes();

    //Revision de session
    if (req.session.email == "undefined") {
      const login = "undefined";
    } else {
      const login = req.session.email;
    }

    if (req.session.user == "undefined") {
      const user = "undefined";
      res.render("index", { alimentos, juguetes, user, numPro });
    } else {
      const user = req.session.user;
      res.render("index", { alimentos, juguetes, user, numPro });
    }
  },
  renderDetalleProducto: async function (req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await db.Producto.findByPk(idProducto, {
        include: ["tipo"],
      });

      const alimentos = await db.Producto.findAll({
        where: { tipo_id: 1 },
        include: ["tipo"],
      });
      const juguetes = await db.Producto.findAll({
        where: { tipo_id: 2 },
        include: ["tipo"],
      });

      let tipo;

      if (producto.tipo === "alimento") {
        tipo = alimentos;
      } else {
        tipo = juguetes;
      }

      // excluyo producto seleccionado para que no salga en productos similares
      const otrosProductos = tipo.filter((i) => i.nombre !== producto.nombre);

      //Reordeno los productos al azar y tomo 4 para mostrar como productos similares
      const productosSimilares = otrosProductos
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      res.render("productDetail", {
        productoADetalle: producto,
        productosSimilares,
      });
    } catch {
      res.send("hola");
    }
  },
  renderListaProductos: async function (req, res) {
    const listaProductos = await db.Producto.findAll({
      include: ["tipo"],
    });
    const archivosImagen = listaProductos.map((i) => i.imagen);
    const idCreacion = listaProductos[listaProductos.length - 1].id + 1;

    res.render("listaProductos", {
      listaProductos,
      archivosImagen,
      idCreacion,
    });
  },
  renderCarrito: function (req, res) {
    res.render("productCart");
  },
  test: async (req, res) => {
    try {
      const productos = await db.Producto.findAll({ include: ["tipo"] });
      console.log(productos);
      res.send(productos);
    } catch (error) {
      console.log("Error");
      return res.send(error);
    }
  },
};

module.exports = productosController;
