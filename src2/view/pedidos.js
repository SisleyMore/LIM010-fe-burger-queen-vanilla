import { getData, pintarArray } from "../firebase-controller/funciones.js";
// import { docById } from "../firebase-controller/funciones.js";

export default () => {
  const divElemt = document.createElement('div');
  divElemt.classList.add('position')

  const viewAccessories = `
   <h2 class="text-center">PEDIDOS</h2>
  <div><button id= "desayunos">DESAYUNO</button><button id= "btn-menus">ALMUERZO Y CENA</button><div id= "carta"></div>
  </div><input class= "hide" type = "text"><div id= "area-pedidos" class="hide"><div id="precio-total"></div></div>`;
  divElemt.innerHTML = viewAccessories;

  const arrPedidos = [];
  const arrOrdenes = [];
  const carta = divElemt.querySelector('#carta');

    const pintarColeccion = (doc) => {
    let btnName = document.createElement('button');
    btnName.setAttribute('id', doc.id);
    btnName.textContent = `${doc.data().name}:  $${doc.data().precio}`;
    carta.appendChild(btnName);

    btnName.addEventListener('click', () => {
      const productoSeleccionado = doc.data();
<<<<<<< HEAD
      const copiaObj = Object.assign({}, productoSeleccionado);
=======
      const copiaObj = Object.assign({}, productoSeleccionado); 
>>>>>>> ddd7d843c2824ffc2dc9e754c5113c9d6195eccc
      copiaObj.id = doc.id;
      copiaObj.cantidad = 1;

      const elemExiste = arrPedidos.find(producto => producto.id === doc.id);
      if (elemExiste) {
        elemExiste.cantidad += 1;
      } else {
        arrPedidos.push(copiaObj);
      };
<<<<<<< HEAD
=======
      // console.log(arrPedidos);
>>>>>>> ddd7d843c2824ffc2dc9e754c5113c9d6195eccc
     let areaPedidos = divElemt.querySelector('#area-pedidos');   
     areaPedidos.classList.remove('hide');
     pintarArray(arrPedidos, areaPedidos);
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
