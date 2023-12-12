// Esta capa contendra las respuestas a las rutas aqui definidas

const express = require('express');     // Requerimos express ya que necesitamos usar sus metodos
const router = express.Router();        // El metodo que necesitamos es "Router"

const mainControllers = require('../controllers/mainControllers');      // Importamos el Objeto con las funciones de la capa Controladores

/* Definimos las rutas de "MAIN" */
router.get('/', mainControllers.indexpage);
router.get('/home', mainControllers.home);
router.get('/contact', mainControllers.contact);
router.post('/contact', mainControllers.contactSend);
router.get('/about', mainControllers.about);
router.get('/faqs', mainControllers.faqs);

module.exports = router;    // Exportamos las rutas aqui definidas