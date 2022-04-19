const Usuario = require("../models/Usuario");

const usuarioLoggeadoMiddleware = (req, res, next) => {
  res.locals.hayUsuarioLoggeado = false;
  const emailEnCookie = req.cookies.emailUsuario;
  const usuarioPorCookie = Usuario.encontrarUsuarioPorCampo(
    "email",
    emailEnCookie
  );

  if (usuarioPorCookie) {
    req.session.usuarioLoggeado = usuarioPorCookie;
  }

  if (req.session.usuarioLoggeado) {
    res.locals.hayUsuarioLoggeado = true;
    res.locals.infoUsuarioLoggeado = req.session.usuarioLoggeado;
  }

  next();
};

module.exports = usuarioLoggeadoMiddleware;
