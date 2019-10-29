import { getData} from "../functions-controller/firebase-controller.js";
import { pintarArray} from "../functions-controller/views-controller.js";
import{aumentarCantidad} from "../functions-controller/funciones.js";

export default () => {
  const divElemt = document.createElement('div');
  divElemt.classList.add('position')

  const viewAccessories = `
   <h2 class="text-center">PEDIDOS</h2>
  <div><button id= "desayunos">DESAYUNO</button><button id= "btn-menus">ALMUERZO Y CENA</button><div id= "carta"></div>
  </div><input class= "hide" type = "text"><div id= "area-pedidos" class="hide"><div id="precio-total"></div></div>`;
  divElemt.innerHTML = viewAccessories;
  const carta = divElemt.querySelector('#carta');

    const pintarColeccion = (doc) => {
    let btnName = document.createElement('button');
    btnName.setAttribute('id', doc.id);
    btnName.textContent = `${doc.data().name}:  $${doc.data().precio}`;
    carta.appendChild(btnName);

    btnName.addEventListener('click', () => {
      const productoSeleccionado = doc.data();
      const copiaObj = Object.assign({}, productoSeleccionado);
      copiaObj.id = doc.id;
      copiaObj.cantidad = 1;
      
      if (copiaObj.name === "Hamburguesa simple" || copiaObj.name === "Hamburguesa doble") {
        alert(doc.data().sabores[1]);
        // const sabores = doc.data().sabores;
        // sabores.forEach(sabor => {
          // const listaSabores = document.createElement("ul");
          // const lista = document.createComment("li");
          // lista.appendChild(listaSabores);
          // listaSabores.appendChild(btnName);
          // lista.textContent =  doc.data().sabores;
      //   })
      // console.log(doc.data().sabores);
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
