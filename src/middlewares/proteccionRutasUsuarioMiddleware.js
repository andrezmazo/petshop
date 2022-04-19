const { redirect } = require("express/lib/response");

const proteccionRutasUsuarioMiddleware = (req, res, next) => {
  if (!req.session.usuarioLoggeado) {
    return res.redirect("/");
  }
  next();
};

module.exports = proteccionRutasUsuarioMiddleware;
