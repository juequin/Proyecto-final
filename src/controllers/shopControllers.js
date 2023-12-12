/* CONTROLADOR de SHOP */
// Esta capa contendra la logica que dara respuesta a la capa de rutas

const { traerTodosLosProductos, traerProductosFiltradosShop, traerUnSoloProducto, traerProductosSlider, traerContenidoCarrito } = require('../models/model');

// Objeto que contiene en cada propiedad una funcion
const shopControllers = {


  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /shop  - - - - - - - - - - - - - - - //
  shop: async (req, res) => {

    // Generamos la informacion necesaria para mostrar
    let dataRecibida = '';

    if (Object.keys(req.query).length > 0) {

            // Funcion para obtener el nombre del query param que recibimos en el "req.query"
            function obtenerNombre(objeto) {
              for (let nombre in objeto) {
                return nombre;
              }
            }

            const nombreQueryParam = obtenerNombre(req.query);
            const valorQueryParam = req.query[nombreQueryParam];

            dataRecibida = await traerProductosFiltradosShop(nombreQueryParam, valorQueryParam);
    
    } else {
    
            dataRecibida = await traerTodosLosProductos();
    
    }

    // Enviamos la Informacion a la vista
    res.render('./shop/shop', {
      title: "Shop | Funkoshop",
      dataRecibida
    });
  },


  
  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /shop/item/:id  - - - - - - - - - - - - - - - //
  item: async (req, res) => {
     
    // Generamos la informacion necesaria para mostrar
    const dataRecibidaItem = await traerUnSoloProducto(req.params.id);
    const dataRecibidaSlider = await traerProductosSlider();

    // Enviamos la Informacion a la vista
    res.render('./shop/item',
      {
        title: "Item | Funkoshop",
        dataRecibidaItem,
        dataRecibidaSlider
      });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta POST de /shop/item/:id/add  - - - - - - - - - - - - - - - //
  itemAdd: (req, res) => {

    const idProducto = req.params.id;
    const cantItems = req.body.quantity;

    // Generamos la informacion necesaria para mostrar
    const messageTitle = "Información:";
    const messageDescript = `El usuario presiono el boton "Agregar al Carrito" ejecutando una solicitud HTTP bajo el metodo POST a la ruta "/shop/item/:id/add" la cual ejecuta la accion de agregar un Item al Carrito.`;
    const messageData = `Data enviada en el Body del POST: \n    ${cantItems} (Valor del Input que indica la cantidad de Items) \n    ${idProducto} (Valor del Query Param que indentifica el Producto)`;

    // Enviamos la Informacion a la vista
    res.render('messages',
    { 
      title: "Item | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },
  
  

  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /shop/cart  - - - - - - - - - - - - - - - //
  cart: async (req, res) => {
    
    // Generamos la informacion necesaria para mostrar
    const contenidoCarrito = await traerContenidoCarrito();
    const todosLosProductos = await traerTodosLosProductos();
   
    const detalleProductosEnCarrito = contenidoCarrito.map(itemDelCarrito => {
      
        // La funcion nos permitira recorrer todos los productos buscando aquel cuyo ID coincida con el ID proveniente del ITEM que estamos analizando con el MAP
        const detalleProductoEncontrado = todosLosProductos.find(producto => producto.prod_id === itemDelCarrito.cart_prod_id);
        
        if (detalleProductoEncontrado) {  // Si el FIND encontro un producto cuyo ID coincide con el ID del item que estamos recorriendo del contenido carrito
          return {                        // usamos "spread syntax" (sintaxis de propagación) para retornar la union de 2 objetos
            ...itemDelCarrito,            // el primero que contendra las propiedades del ITEM que estamos recorriendo en "contenidoCarrito"
            ...detalleProductoEncontrado  // y el segundo que contendra las propiedades del Producto cuyo ID coincidio en FIND con el Item de "contenidoCarrito"
          };
        } else {
          return null;  // Si el FIND no encontro coincidencias retornaremos un NULL para evitar que el UNDEFINED nos cause problemas en el MAP
        }

    });

    const dataParaListarCarrito = detalleProductosEnCarrito.filter(Boolean); // Aplicamos este metodo filter para quitar el elemento de valor NULL del array
    
    // Enviamos la Informacion a la vista
    res.render('./shop/cart', {
      title: "Carrito | Funkoshop",
      dataParaListarCarrito
    })
  },

  

  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta POST de /shop/cart  - - - - - - - - - - - - - - - //
  payment: (req, res) => {
   
    // Generamos la informacion necesaria para mostrar
    const messageTitle = "Información:";
    const messageDescript = `El usuario presiono el boton "IR A PAGAR" ejecutando una solicitud HTTP bajo el metodo POST a la ruta "/shop/cart" la cual ejecuta la accion de ir a la plataforma de pagos.`;
    const messageData = `Data recibida en el Body del POST: \n ${JSON.stringify(req.body, null, 4)}`;

    // Enviamos la Informacion a la vista
    res.render('messages',
    {
      title: "Pago | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },


};

module.exports = shopControllers;     // exportamos el objeto con sus propiedades