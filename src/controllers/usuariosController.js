const e = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const { hashSync } = bcrypt;

const usuariosController = {
  crearUsuario: function (req, res) {
    const errors = validationResult(req);
    const contrasenaHasheada = hashSync(req.body.contrasena, 10);
    const usuarioEnDB = Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );

    if (usuarioEnDB) {
      return res.render("register", {
        old: req.body,
        errors: {
          email: {
            msg: "este email ya se encuentra en la base de datos",
          },
        },
      });
    }

    if (errors.isEmpty()) {
      Usuario.crearUsuario({
        ...req.body,
        foto: req.file ? req.file.filename : "default.jpg",
        contrasena: contrasenaHasheada,
        autoriza: req.body.autorizacion ? true : false,
        admin: false,
      });

      return res.redirect("/login");
    } else {
      return res.render("register", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },

  crearUsuarioDesdeDirectorio: function (req, res) {
    const errors = validationResult(req);
    const contrasenaHasheada = hashSync(req.body.contrasena, 10);
    const usuarioEnDB = Usuario.encontrarUsuarioPorCampo(
      "email",
      req.body.email
    );
    const listaUsuarios = Usuario.obtenerListaUsuarios();

    if (usuarioEnDB) {
      return res.render("listaUsuarios", {
        old: req.body,
        errors: {
          email: {
            msg: "email en uso",
          },
        },
        listaUsuarios,
      });
    }

    if (errors.isEmpty()) {
      Usuario.crearUsuario({
        ...req.body,
        foto: req.file ? req.file.filename : "default.jpg",
        contrasena: contrasenaHasheada,
        autoriza: req.body.autorizacion ? true : false,
        admin: req.tipo === "administrador" ? true : false,
      });

      return res.redirect("/listaUsuarios");
    } else {
      return res.render("listaUsuarios", {
        old: req.body,
        errors: errors.mapped(),
        listaUsuarios,
      });
    }
  },

  renderPerfilUsuarioLoggeado: (req, res) => {
    return res.render("userProfile", {
      infoUsuario: req.session.usuarioLoggeado,
    });
  },

  renderPerfilDesdeDirectorio: function (req, res) {
    const listaUsuarios = Usuario.obtenerListaUsuarios();
    const idUsuario = req.params.id;
    const infoUsuario = listaUsuarios.find((elem) => elem.id == idUsuario);

    return res.render("userProfile", {
      infoUsuario,
    });
  },

  editarUsuarioDesdeDirectorio: function (req, res) {
    const idUsuario = parseInt(req.params.id);
    const usuarioAEditar = Usuario.encontrarUsuarioPorPK(idUsuario);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      Usuario.editarUsuario(usuarioAEditar.email, {
        ...req.body,
        foto: req.file ? req.file.filename : usuarioAEditar.foto,
      });
      return res.redirect(`/userProfile/${req.params.id}`);
    } else {
      return res.render("editarUsuario", {
        old: req.body,
        errors: errors.mapped(),
        infoUsuario: usuarioAEditar,
      });
    }
  },

  eliminarUsuario: function (req, res) {
    const idUsuario = parseInt(req.params.id);

    Usuario.borrarUsuarioPorId(idUsuario);

    return res.redirect("/listaUsuarios");
  },

  renderFormularioEdicion: function (req, res) {
    const idUsuarioAEditar = parseInt(req.params.id);
    const usuarioAEditar = Usuario.encontrarUsuarioPorPK(idUsuarioAEditar);

    return res.render("editarUsuario", {
      infoUsuario: usuarioAEditar,
    });
  },

  renderListaUsuarios: function (req, res) {
    const listaUsuarios = Usuario.obtenerListaUsuarios();

    return res.render("listaUsuarios", {
      listaUsuarios,
    });
  },
};

module.exports = usuariosController;
