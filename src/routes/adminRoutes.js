// Esta capa contendra las respuestas a las rutas aqui definidas

const express = require('express');     // Requerimos express ya que necesitamos usar sus metodos
const router = express.Router();        // El metodo que necesitamos es "Router"

const adminControllers = require('../controllers/adminControllers');    // Importamos el Objeto con las funciones de la capa Controladores

/* Definimos las rutas de "ADMIN" */
router.get('/', adminControllers.admin);
router.get('/create', adminControllers.create);
router.post('/create', adminControllers.createAdd);
router.get('/edit/:id', adminControllers.edit);
router.put('/edit/:id', adminControllers.editSave);
router.delete('/delete/:id', adminControllers.delete);

module.exports = router;    // Exportamos las rutas aqui definidas