//capturando elementos
const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();
let productoCarrito = [];




//agregando evento click
document.addEventListener("click", (e)=>{
    console.log(e.target.matches(".btn-outline-primary")); //entrega un false o un true
    agregarCarrito(e);
    // console.log(e.target);

    if(e.target.matches(".btnSumar")){

        sumarProducto(e);
        console.log("Agregar producto");

    }else if(e.target.matches(".btnQuitar")){
        // quitarProducto(e);
        console.log("Quitar producto");

    }

});


// funcion para agregar elementos al carrito

const agregarCarrito = (e)=>{ //pasamos el evento para

     const producto = {
        nombre: e.target.dataset.fruta,
        id:e.target.id,
        cantidad : 1,
        precio:parseInt(e.target.dataset.precio)
     }
     const index = productoCarrito.findIndex(item => item.id === producto.id); //recorre el array comparando ids
     console.log(index);
     if (index === -1){
        productoCarrito.push(producto);
     }else{
        productoCarrito[index].cantidad++;
     }
    //  console.log(producto);
    //  console.log(e.target.dataset.id);
    


    pintarCarrito(producto);


}



// ahora viene agregar el producto al carrito y pintarlos

const pintarCarrito = () => { 
    carrito.textContent = null; //vacio para que no se repita todos los elementos agregados antes
    const clone = template.content.cloneNode(true);
    
    productoCarrito.forEach(item =>{
        const clone = template.content.cloneNode(true);
        clone.getElementById("nombreProducto").textContent = item.nombre;
        clone.getElementById("cantidad").textContent = item.cantidad;
        clone.getElementById("precioProducto").textContent = item.cantidad * item.precio;
        console.log(item);
        fragment.appendChild(clone);

    });

    carrito.appendChild(fragment);
    


}//


//solo falta la logica para q se sume y quiten productos ademas de pintar el total.

// const sumarProducto = (e) => {
   
//    productoCarrito = productoCarrito.map(item =>{
//     console.log("agregar producto " + e.target.dataset.id);

//     if (item.id === e.target.id){
//         item.cantidad++;
//     }return item;

//    });
   
//    pintarCarrito();
// }