// Esta capa contendra las respuestas a las rutas aqui definidas

const express = require('express');     // Requerimos express ya que necesitamos usar sus metodos
const router = express.Router();        // El metodo que necesitamos es "Router"

const errorControllers = require('../controllers/errorControllers');        // Importamos el Objeto con las funciones de la capa Controladores

/* Definimos las rutas de "ERRORES" */
router.use(errorControllers.error404);

module.exports = router;    // Exportamos las rutas aqui definidas