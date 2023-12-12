// Esta capa contendra las respuestas a las rutas aqui definidas

const express = require('express');     // Requerimos express ya que necesitamos usar sus metodos
const router = express.Router();        // El metodo que necesitamos es "Router"

const authControllers = require('../controllers/authControllers');      // Importamos el Objeto con las funciones de la capa Controladores

/* Definimos las rutas de "AUTENTICACION" */
router.get('/login', authControllers.loginView);
router.post('/login', authControllers.loginSend);
router.get('/register', authControllers.registerView);
router.post('/register', authControllers.registerSend);
router.get('/logout', authControllers.logout);

module.exports = router;    // Exportamos las rutas aqui definidas