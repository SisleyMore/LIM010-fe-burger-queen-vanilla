import { getData} from "../functions-controller/firebase-controller.js";
import { pintarArray, pintarSabores, añadirPropiedad} from "../functions-controller/views-controller.js";

import{aumentarCantidad} from "../functions-controller/funciones.js";

export default () => {
  const divElemt = document.createElement('div');
  divElemt.classList.add('position')

  const viewAccessories = `
   <h2 class="text-center">PEDIDOS</h2>
  <div><button id= "desayunos">DESAYUNO</button><button id= "btn-menus">ALMUERZO Y CENA</button><div id= "carta"></div>
  </div><div id="modal"></div><ul class = "hide" id = "adicional"><li id= "lista"></li></ul><input class= "hide" type = "text">
  <div id= "area-pedidos" class="hide"><div id="precio-total"></div></div>`;
  divElemt.innerHTML = viewAccessories;
  const carta = divElemt.querySelector('#carta');

    const pintarColeccion = (doc) => {
    let divButton = document.createElement('div');
    let divSabores = document.createElement('div');
    let btnName = document.createElement('button');
    btnName.setAttribute('id', doc.id);
    btnName.textContent = `${doc.data().name}:  $${doc.data().precio}`;
    divButton.setAttribute('name',doc.data().name);
    divButton.appendChild(btnName);
    divButton.appendChild(divSabores);
    carta.appendChild(divButton);

    btnName.addEventListener('click', () => {
      const productoSeleccionado = doc.data();
      const copiaObj = Object.assign({}, productoSeleccionado);
      copiaObj.id = doc.id;
      copiaObj.cantidad = 1;
      console.log(doc.data());
      if (copiaObj.name === "Hamburguesa simple" || copiaObj.name === "Hamburguesa doble") {
        const sabores = doc.data().sabores;
        pintarSabores(sabores, divSabores);
        let modal = divElemt.querySelector('#modal');   
        añadirPropiedad(divSabores,copiaObj, modal);

       }

     aumentarCantidad(copiaObj,doc.id);
     let areaPedidos = divElemt.querySelector('#area-pedidos');   
     areaPedidos.classList.remove('hide');
     pintarArray(areaPedidos);
      });
  };

  const desayunos = divElemt.querySelector('#desayunos');

  desayunos.addEventListener('click', () => {
    carta.innerHTML = "";
    getData('Desayunos').then((snapshot) => {
      snapshot.docs.forEach(doc => {
        pintarColeccion(doc);
      });
    });
  }); 
  const btnMenus = divElemt.querySelector('#btn-menus');

  btnMenus.addEventListener('click', () => {
    carta.innerHTML = "";
    getData('Menus').then((snapshot) => {
      snapshot.docs.forEach(doc => {
        pintarColeccion(doc);
      });
    });
  });
  return divElemt;
};