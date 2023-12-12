/* CONTROLADOR de ADMIN */
// Esta capa contendra la logica que dara respuesta a la capa de rutas

const { traerTodosLosProductos, traerUnSoloProducto, traerProductosFiltradosAdmin } = require('../models/model');

// Objeto que contiene en cada propiedad una funcion
const adminControllers = {


  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /admin  - - - - - - - - - - - - - - - //
  admin: async (req, res) => {

    // Generamos la informacion necesaria
    let listaDeProductos = '';

    if (Object.keys(req.query).length > 0) {
        listaDeProductos = await traerProductosFiltradosAdmin(req.query.buscar);
    } else {
        listaDeProductos = await traerTodosLosProductos();
    }
    
    // Enviamos la Informacion a la vista
    res.render('./admin/admin', 
    {
      title: "Admin | Funkoshop",
      listaDeProductos
    });
  },
    


  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /admin/create  - - - - - - - - - - - - - - - //
  create:(req, res) => {

    res.render('./admin/create', 
    {
      title: "Create | Funkoshop"
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta POST de /admin/create  - - - - - - - - - - - - - - - //
  createAdd:(req, res) => {

    // Generamos la informacion necesaria
    const messageTitle = "Información";
    const messageDescript = `El usuario ha presionado el Boton "Agregar Producto" para guardar el nuevo producto creado \nDicha accion genero una consulta HTTP mediante el metodo POST.`;
    const messageData = `Data Recibida en el Body del POST: \n${JSON.stringify(req.body, null, 4)}`;

    // Enviamos la Informacion a la vista
    res.render('messages',
    {
      title: "Producto Creado | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /admin/edit/:id  - - - - - - - - - - - - - - - //
  edit: async (req, res) => {

    // Generamos la informacion necesaria
    const dataProductoEditando = await traerUnSoloProducto(req.params.id);
    
    // Enviamos la Informacion a la vista
    res.render('admin/edit', {
      title: "Edit | Funkoshop",
      dataProductoEditando
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta PUT de /admin/edit/:id  - - - - - - - - - - - - - - - //
  editSave:(req, res) => {
    
    // Generamos la informacion necesaria
    const messageTitle = "Información";
    const messageDescript = `El usuario ha presionado el Boton "Modificar Producto" para guardar los cambios en el producto editado \nDicha accion genero una consulta HTTP mediante el metodo POST. \nUtilizando el middleware "method-override" sobreescribiremos el metodo de POST a PUT.`;
    const messageData = `Dato recibido en el Path Param: ${req.params.id} (ID del producto) \nData Recibida en el Body del POST: \n${JSON.stringify(req.body, null, 4)}`;

    // Enviamos la Informacion a la vista
    res.render('messages',
    {
      title: "Producto Guardado | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta DELETE de /admin/delete/:id  - - - - - - - - - - - - - - - //
  delete: (req, res) => {

    // Generamos la informacion necesaria
    const messageTitle = "Información";
    const messageDescript = `El usuario ha presionado el boton Eliminar en la vista Admin, generando asi una consulta HTTP bajo el Metodo POST. \n Utilizando el middleware "method-override" sobreescribiremos el metodo de POST a DELETE.`;
    messageData = `Mediante el Path Param, obtenemos el ID del Producto al cual debemos aplicarle el metodo DELETE \n En este caso el ID ${req.params.id}`;
    
    // Enviamos la Informacion a la vista
    res.render('messages',
    {
      title: "Eliminar Item | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },


};

module.exports = adminControllers;  // exportamos el objeto con sus propiedades