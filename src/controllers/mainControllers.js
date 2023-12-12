/* CONTROLADOR de MAIN */
// Esta capa contendra la logica que dara respuesta a la capa de rutas

const { traerColecciones, traerProductosSlider } = require('../models/model');

// Objeto que contiene en cada propiedad una funcion
const mainControllers = {


  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /  - - - - - - - - - - - - - - - //
  indexpage: (req, res) => res.redirect('/home'),    // nuestra seccion principal es "home" asi que redirigimos a ella



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /home  - - - - - - - - - - - - - - - //
  home: async (req, res) => {

    // Generamos la informacion necesaria para mostrar
    const dataRecibidaColecciones = await traerColecciones();
    const dataRecibidaSlider = await traerProductosSlider();

    // Enviamos la Informacion a la vista
    res.render('shop/home', { 
      title: "Home | Funkoshop",
      dataRecibidaColecciones,
      dataRecibidaSlider
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /contact  - - - - - - - - - - - - - - - //
  contact: (req, res) => {

    // Como no necesitamos generar informacion simplemente renderizamos la vista
    res.render('shop/contact',
    {
     title: "Contacto | Funkoshop" 
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta POST de /contact  - - - - - - - - - - - - - - - //
  contactSend: (req, res) => {

    // Generamos la informacion necesaria para mostrar
    const messageTitle = "Información";
    const messageDescript = `El usuario ha presionado el Boton "Enviar" en el formulario de contacto \nDicha accion genero una consulta HTTP mediante el metodo POST.`;
    const messageData = `Data Recibida en el Body del POST: \n${JSON.stringify(req.body, null, 4)}`;

    // Enviamos la Informacion a la vista
    res.render('messages',
    {
      title: "Producto Guardado | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /about  - - - - - - - - - - - - - - - //
  about: (req, res) => res.send('Ruta para la vista Sobre Nosotros.'),    // Como no tenemos seccion "sobre nosotros" mostramos un texto plano



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /faqs  - - - - - - - - - - - - - - - //
  faqs: (req, res) => res.send('Ruta para la vista FAQs.'),    // Como no tenemos seccion "FAQs" mostramos un texto plano


};

module.exports = mainControllers;     // exportamos el objeto con sus propiedades