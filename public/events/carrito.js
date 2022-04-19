function favoritas(id) {
  return (
    '<div class="ec-stars-wrapper">' +
    `<a href="#" onclick="miCalificacion(${id},1)">&#9733;</a>` +
    "</div>"
  );
}

function seleccionar(id, cont) {
  let datos = localStorage.getItem("datos");
  if (datos !== null) {
    let arr = datos.split(",");
    arr.push(id);
    localStorage.setItem("datos", arr);
  } else {
    localStorage.setItem("datos", id);
  }
}
let cont = Array(100).fill(1);

window.addEventListener("load", function () {
  let agregar = document.querySelectorAll(".comprar");
  let botonMenos = document.querySelectorAll(".boton-menos");
  let botonMas = document.querySelectorAll(".boton-mas");
  let num = document.querySelectorAll(".num");

  botonMenos.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      if (cont[index] > 1) {
        cont[index] = cont[index] - 1;
        num[index].innerHTML = cont[index];
      }
    });
  });

  botonMas.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      cont[index] = cont[index] + 1;
      num[index].innerHTML = cont[index];
    });
  });

  agregar.forEach((button) => {
    button.addEventListener("click", function (e) {
      // e.preventDefault();
      seleccionar(e.target.id);
    });
  });
});

// window.addEventListener("load", function () {
//   let agregar = document.querySelectorAll(".prueba");
//   agregar[1].addEventListener("click", function (e) {

//   });

//   // agregar[].addEventListener("click", function (e) {
//   //   e.preventDefault();
//   //   alert("Producto agregado");
//   // });

//   // alert("121231");
// });
