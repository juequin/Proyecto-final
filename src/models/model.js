// Este archivo es la capa de modelos y sera la que interactue con la base de datos para traer la infoamacion y entregarsela al controlador segun sus requerimentos

const fs = require('fs');
const path = require('path');


/* Funcion para mezclar los ITEMS y mostrarlos en orden aleatorio (Solo sera usada aqui dentro del modelo) */
function generarOrdenAleatorio(array) {
    const copyArray = [...array]; //
    return copyArray.sort(() => Math.random() - 0.5);
  }


// Funcion que traera TODOS producto del JSON
const traerTodosLosProductos = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../data/products.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);

    return datosJsonParseados;
};



// Funcion que trae SOLO UN producto del JSON en base a un ID recibido como parametro
const traerUnSoloProducto = async (idBuscado) => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../data/products.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);

    const productoSeleccionado = datosJsonParseados.filter(producto => producto.prod_id == idBuscado);

    return productoSeleccionado;
};



// Funcion que trae aquellos productos del JSON que coinciden con el "Valor Buscado"  (Seccion ADMIN)
const traerProductosFiltradosAdmin = async (valorBusqueda) => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../data/products.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);
    
    const productosFiltrados = datosJsonParseados.filter(producto =>
            (producto.prod_sku.toLowerCase()).includes(valorBusqueda.toLowerCase()) ||
            (producto.prod_nombre.toLowerCase()).includes(valorBusqueda.toLowerCase()) ||
            (producto.prod_categoria.toLowerCase()).includes(valorBusqueda.toLowerCase()) ||
            (producto.prod_licencia.toLowerCase()).includes(valorBusqueda.toLowerCase())
        );

    return productosFiltrados;
};



// Funcion que trae aquellos productos del JSON que coinciden con el "Valor Buscado" o "Tipo de Filtrado"  (Seccion SHOP)
const traerProductosFiltradosShop = async (nombreQueryParam, valorQueryParam) => {

    const dataDelJson = await fs.readFileSync(path.resolve(__dirname, '../data/products.json'));
    const datosJsonParseados = await JSON.parse(dataDelJson);

    let productosFiltrados = "";
    
    switch (nombreQueryParam) {
        case "newProducts":
            listaProductos = datosJsonParseados.filter(producto => producto.prod_nuevo == true);
            productosFiltrados = generarOrdenAleatorio(listaProductos);
            break;
        case "license":
            listaProductos = datosJsonParseados.filter(producto => producto.prod_licencia.toLowerCase() == valorQueryParam.toLowerCase());
            productosFiltrados = generarOrdenAleatorio(listaProductos);
            break;
        case "category":
            listaProductos = datosJsonParseados.filter(producto => producto.prod_categoria.toLowerCase() == valorQueryParam.toLowerCase());
            productosFiltrados = generarOrdenAleatorio(listaProductos);
            break;
        case "buscar":
            productosFiltrados = datosJsonParseados.filter(producto => 
                (producto.prod_nombre.toLowerCase()).includes(valorQueryParam.toLowerCase()) ||
                (producto.prod_licencia.toLowerCase()).includes(valorQueryParam.toLowerCase())
            );
            break;
        default:
            productosFiltrados = datosJsonParseados;
            break;
    };

    return productosFiltrados;
};



// Funcion que trae SOLO aquellos productos del JSON que tengan la propiedad "prod_sliderincluir" definida como TRUE
const traerProductosSlider = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../data/products.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);

    const productosSeleccionados = datosJsonParseados.filter(producto => producto.prod_sliderincluir == true);                                                                                                    

    return generarOrdenAleatorio(productosSeleccionados);
};



// Funcion que trae Todas las Colecciones del JSON
const traerColecciones = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../data/collections.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                                                                  

    return datosJsonParseados;
};



// Funcion que trae los items cargados en el carrito
const traerContenidoCarrito = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../data/cartContent.json'));
    const datosJsonParseados =  await JSON.parse(dataDelJson);                             

    return datosJsonParseados;
};



// Exportamos las Funciones para que esten disponibles por quien requiera este modulo de la capa modelos
module.exports = {
    traerTodosLosProductos,
    traerUnSoloProducto,
    traerProductosFiltradosAdmin,
    traerProductosFiltradosShop,
    traerProductosSlider,
    traerColecciones,
    traerContenidoCarrito
};