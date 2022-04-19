const fs = require("fs");

const Usuario = {
  nombreArchivo: "./src/data/usuariosDB.json",
  obtenerListaUsuarios: function () {
    return JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
  },
  generarId: function () {
    const listaUsuarios = this.obtenerListaUsuarios();
    const ultimoUsuario = listaUsuarios.pop();

    if (ultimoUsuario) {
      return ultimoUsuario.id + 1;
    }
    return 1;
  },
  borrarUsuarioPorId: function (id) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const listaSinUsuario = listaUsuarios.filter(
      (usuario) => usuario.id !== id
    );

    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaSinUsuario, null, " ")
    );

    return true;
  },
  crearUsuario: function (nuevoUsuario) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const usuarioACrear = {
      id: this.generarId(),
      ...nuevoUsuario,
    };

    listaUsuarios.push(usuarioACrear);
    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaUsuarios, null, " "),
      (err) => {
        if (err) {
          console.log("Fallo en la creación del usuario");
        } else {
          console.log("Usuario creado exitosamente");
        }
      }
    );

    return usuarioACrear;
  },
  encontrarUsuarioPorCampo: function (campo, valor) {
    const listaUsuarios = this.obtenerListaUsuarios();

    return listaUsuarios.find((usuario) => valor == usuario[campo]);
  },
  encontrarUsuarioPorPK: function (pk) {
    const listaUsuarios = this.obtenerListaUsuarios();

    return listaUsuarios.find((usuario) => pk == usuario.id);
  },
  editarUsuario: function (email, datosNuevos) {
    const listaUsuarios = this.obtenerListaUsuarios();
    const datosPreviosUsuario = this.encontrarUsuarioPorCampo("email", email);
    const listaSinUsuario = listaUsuarios.filter(
      (usuario) => usuario.email !== email
    );
    const usuarioEditado = {
      ...datosPreviosUsuario,
      ...datosNuevos,
      admin: datosNuevos.admin === "true" ? true : false,
      autoriza: datosNuevos.autoriza === "true" ? true : false,
      fecha:
        datosNuevos.fecha === ""
          ? datosPreviosUsuario.fecha
          : datosNuevos.fecha,
    };

    listaSinUsuario.push(usuarioEditado);

    fs.writeFileSync(
      this.nombreArchivo,
      JSON.stringify(listaSinUsuario, null, " ")
    );
    return true;
  },
};

module.exports = Usuario;
