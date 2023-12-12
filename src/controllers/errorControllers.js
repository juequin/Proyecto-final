/* CONTROLADOR de ERRORES */
// Esta capa contendra la logica que dara respuesta a la capa de rutas

// Objeto que contiene en cada propiedad una funcion
const errorControllers = {

  //  - - - - - - - - - - - - - - -  Funcion para responder a la rutas Inexistentes  - - - - - - - - - - - - - - - //
  error404: (req, res) => {

    // Generamos la informacion necesaria para mostrar
    const messageTitle = "Error 404!";
    const messageDescript = "La ruta especificada No Existe.";
    const messageData = "";

    // Enviamos la Informacion a la vista
    res.status(404).render('messages',
    {
      title: "Error | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  }

};

module.exports = errorControllers;    // exportamos el objeto con sus propiedades