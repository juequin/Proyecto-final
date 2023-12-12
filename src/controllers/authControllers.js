/* CONTROLADOR de AUTH */
// Esta capa contendra la logica que dara respuesta a la capa de rutas

// Objeto que contiene en cada propiedad una funcion
const authControllers = {


  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /auth/login  - - - - - - - - - - - - - - - //
  loginView: (req, res) => {
    
    // Como no necesitamos generar informacion simplemente renderizamos la vista
    res.render('auth/login', 
    {
      title: "Login | Funkoshop"
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta POST de /auth/login  - - - - - - - - - - - - - - - //
  loginSend: (req, res) => {
    
    // Hacemos una verificacion de LOGIN con datos estaticos
    bdEmail = "cac23577-grupo1@gmail.com";
    bdPassword = "pass123";

    let loginResultStatus = "";
    let loginResultMessage = "";

    // Dependiendo de los datos ingresados el resultado del login mostrara diferentes mensajes
    if (req.body.user == bdEmail){
        if (req.body.password == bdPassword) {
          loginResultMessage = "Login Exitoso";
          loginResultStatus = true;
        } else {
          loginResultMessage = "Datos Incorrectos, por favor Verifique.";
          loginResultStatus = false;
        }
      } else {
        loginResultMessage = "Su usuario no existe, Por favor Registrese";
        loginResultStatus = false;
    };

    // Enviamos la Informacion a la vista
    res.render('auth/loginresult',
    {
      title: "Login | Funkoshop",
      loginResultTitle: "LOGIN",
      loginResultMessage,
      loginResultStatus
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /auth/register  - - - - - - - - - - - - - - - //
  registerView: (req, res) => {

    // Como no necesitamos generar informacion simplemente renderizamos la vista
    res.render('auth/register', 
    {
      title: "Register | Funkoshop"
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta POST de /auth/register  - - - - - - - - - - - - - - - //
  registerSend: (req, res) => {

    // Generamos la informacion necesaria para mostrar
    const messageTitle = "Información";
    const messageDescript = `El usuario ha completado el formulario de registro y presionado el boton "Registrar" \n Ejecutando de esta manera una consulta HTTP del tipo POST con el siguiente contenido en el Body`;
    const messageData = `Data recibida en el Body del POST: \n ${JSON.stringify(req.body, null, 4)}`;

    // Enviamos la Informacion a la vista
    res.render('messages',
    {
      title: "Registro Completo | Funkoshop",
      messageTitle,
      messageDescript,
      messageData
    });
  },



  //  - - - - - - - - - - - - - - -  Funcion para responder a la ruta GET de /auth/logout  - - - - - - - - - - - - - - - //
  logout: (req, res) => res.redirect('/home'),  // Como no necesitamos mostrar una vista, redireccionamos a home


};

module.exports = authControllers;   // exportamos el objeto con sus propiedades