const proteccionRutasAdminMiddleware = (req, res, next) => {
  if (!req.session.usuarioLoggeado.admin) {
    return res.redirect("/");
  }

  next();
};

module.exports = proteccionRutasAdminMiddleware;
