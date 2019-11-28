import { calcularTotal, crearObjeto, eliminarPedido, arrPedidos } from "../functions-controller/funciones.js";

export const pintarArray = (eleHTML) => {
  eleHTML.innerHTML = '';
  const resultado = arrPedidos.reduce((accum, elem, indice) => {
    return accum + `
        <tr>
        <td>${elem.name}</td>
        <td>$${elem.precio}</td>
        <td>${elem.cantidad} unidades</td>
        <td><button id="${indice}" name="eliminar">x</button></td>
        </tr>`;
  }, '')


  const tabla = document.createElement("table");
  tabla.innerHTML = `
    <input type="text" id= "nombre" placeholder="Cliente">
    <th>Pedido</th>
    <th>Precio</th>
    <th>Cantidad</th>
     ${resultado} 
     `;
  eleHTML.appendChild(tabla);
  tabla.setAttribute('id', 'tabla-pedidos');

  const botones = tabla.querySelectorAll(`[name='eliminar']`)
  botones.forEach((btnDelete) => {
    btnDelete.addEventListener('click', (event) => {
      eliminarPedido();
      pintarArray(eleHTML)
    });
  })

  const divTotal = document.createElement("div");
  eleHTML.appendChild(divTotal);
  const nombreCliente = tabla.querySelector('#nombre');
  calcularTotal(divTotal);

  const guardarPedido = document.createElement("button");
  guardarPedido.textContent = 'OK';
  eleHTML.appendChild(guardarPedido);
  guardarPedido.addEventListener('click', () => {
    crearObjeto(nombreCliente, calcularTotal(divTotal));
    eleHTML.innerHTML = '';
  })

};

export const pintarSabores = (arr, eleHTML) => {
  const listas = arr.reduce((accum, sabor) => {
    return accum +
      `<button id = ${sabor} name = 'sabores'>${sabor}</button>`
  }, "");
  eleHTML.innerHTML=listas;
};

export const añadirPropiedad = (eleHTML ,obj, divModal)=>{
const btnDeSabores = eleHTML.querySelectorAll(`[name='sabores']`);
  btnDeSabores.forEach((btnSabor) => {
    btnSabor.addEventListener('click', (event) => {
      const NombreDeSaboresEnId = event.target.id;
      obj.saborElegido= NombreDeSaboresEnId;
      const templateModal = `<div id="ventana" class ="ventana">
      <span class="cerrar" id="cerrar">&times;</span>
      <p class="textModal">¿Desea agregar un adicional por $1?</p>
      <form>
      <label><input type="checkbox" id="cbox1" value="huevo"> huevo </label><br>
      <input type="checkbox" id="cbox2" value="queso"> <label for="cbox2"> queso</label><br><label><input type="checkbox" id="cbox3" value="huevo y queso"> huevo y queso </label>
      <button type="submit" id="agregar-adicional">ok</button>
      </form>
      </div> `
      divModal.innerHTML = templateModal;

      divModal.querySelector('#cerrar').addEventListener('click', () => {
        divModal.querySelector('#ventana').classList.add('hide');
      })

      const agregarAdicional = divModal.querySelector('#agregar-adicional');
      const adicional1 = divModal.querySelector('#cbox1');
      const adicional2 = divModal.querySelector('#cbox2');
      const adicional3 = divModal.querySelector('#cbox3');
      agregarAdicional.addEventListener('click', () =>{
      if(adicional3.checked == true ){console.log(obj.precio+=2)}else if(adicional1.checked == true || adicional2.checked == true ){ console.log(obj.precio+=1)}
      

      })
   
  });
});
}


