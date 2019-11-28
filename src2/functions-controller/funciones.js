import { guardarData } from "../functions-controller/firebase-controller.js";
export  let arrPedidos = [];
export const calcularTotal = (elem) => {
  const total = arrPedidos.reduce((accum, actual) => {
    return accum + actual.cantidad * actual.precio;
  },0)  
  elem.innerHTML = `total: $ ${total}`;
  return total
}

export const crearObjeto = (input, total) => {
  const objOrdenes = {};
  objOrdenes.cliente = input.value;
  objOrdenes.productos = arrPedidos;
  objOrdenes.total = total;
  objOrdenes.fecha = new Date();
  guardarData('Ordenes', objOrdenes)
  .then(() => {
  arrPedidos=[];
  })
  .catch(()=> {
  console.log('realiza nuevamente la orden');
  })
}

export const aumentarCantidad = (objetoProducto,buttonId) => {
const elemExiste = arrPedidos.find(producto => producto.id === buttonId);
if (elemExiste) {
  elemExiste.cantidad += 1;
} else {
  arrPedidos.push(objetoProducto);
}};

export const eliminarPedido = () => {
  const getIndex=event.target.id;
      arrPedidos.splice(getIndex,1);
}

