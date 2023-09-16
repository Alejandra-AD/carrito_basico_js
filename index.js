console.log("vinculado");

//capturando cosas

const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
// const btnProductos = document.querySelectorAll(".card .btn");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter"); //

document.addEventListener("click", (e) => {
    // console.log(e.target.matches(".card .btn-outline-primary"));

    if (e.target.matches(".card .btn-outline-primary")) {

        // console.log("añadir funcion agregar al carrito");
        agregarCarrito(e);
    }

    if (e.target.matches(".btnAgregar")) {
        console.log(e.target.matches(".btnAgregar"));
        btnAgregar(e);
    }

    if (e.target.matches(".btnQuitar")) {
        console.log(e.target.matches(".btnQuitar"));
        btnQuitar(e);
    }




    // if (e.target.matches(".border-secundary")) {
    //     console.log("diste click al elemento hijo");
    //     }

});


//creando el fragment para evitar el reflow
const fragment = document.createDocumentFragment();

//objeto carrito
let objetoCarrito = [];



//funcion agregar productos al carrito

const agregarCarrito = (e) => {
    // console.log(evento);
    console.log(e.target.dataset.fruta); //mostrando en contenido de cada boton
    const producto = { //creando objeto para ir guardando en el array objeto carrito
        nombre: e.target.dataset.fruta,
        id: e.target.id,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    };

    console.log(producto);

    const index = objetoCarrito.findIndex(item => item.id === producto.id);
    console.log(index);

    if (index !== -1) {
        objetoCarrito[index].cantidad++; // si el item en el array objetoCarrito ya se encuenta , la cantidad del item con el mismo index aumenta
        console.log(objetoCarrito[index].cantidad);
        //    objetoCarrito[index].precio = objetoCarrito[index].cantidad * producto.precio ;
        //    console.log(objetoCarrito[index].precio);
    } else {
        objetoCarrito.push(producto);//caso contrario, no se encuentra producto en el carrito. Entonces se agrega
    };

    console.log(objetoCarrito);

    pintarCarrito(objetoCarrito);

};

// evento click boton agregar

// btnProductos.forEach(btn =>{
//     // console.log(btn);
//     btn.addEventListener("click",agregarCarrito);//agregando evento a cada boton
// });

//pintar carrito

const pintarCarrito = () => {

    carrito.textContent = null; //vacio para que no se repita todos los elementos agregados antes

    objetoCarrito.forEach(item => {

        const clone = template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector(".divTotal span").textContent = item.precio * item.cantidad;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;

        console.log(item);

        fragment.appendChild(clone);

    });

    // const cloneFooter = templateFooter.content.firstElementChild.cloneNode(true);
    // console.log(cloneFooter.getElementById(footer));

    carrito.appendChild(fragment);
    pintarFooter();
};


const pintarFooter = () => {

    footer.textContent = null;


    const total = objetoCarrito.reduce((acc,current) => acc + current.cantidad * current.precio, 0);
        //primer parametro que se va acumulando,  0 para q devuelva entero);

    const cloneFooter = templateFooter.content.cloneNode(true);
    cloneFooter.querySelector("span").textContent = total;

    footer.appendChild(cloneFooter);
    
}

const btnAgregar = (e) => {
    console.log("me diste click agregar", e.target.dataset.id);

    objetoCarrito = objetoCarrito.map(item => {

        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });

    pintarCarrito();


};

const btnQuitar = (e) => {
    console.log("me diste click quitar", e.target.dataset.id);
    objetoCarrito = objetoCarrito.filter(item => {
        if (item.cantidad > 0) {
            item.cantidad--;
            if (item.cantidad === 0) {
                return;
            }
        } return item;
    });

    pintarCarrito();
};

