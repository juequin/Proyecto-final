const express = require('express');     // Importamos el modulo de Express
const app = express();                  // Ejecutamos Express

const path = require('path');           // Metodo Path para resolver rutas

const methodOverride = require('method-override');      // Herramienta "method-override" para sobreescribir los POST

require('dotenv').config();

/* Requerimos nuestros modulos de rutas */
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorRoutes = require('./src/routes/errorRoutes');

const PORT = process.env.PORT;       // Puerto que estara escuchando el servidor

/* Template Engine */
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

/* Middlewares de Configuracion */
app.use(express.urlencoded());              // Parsea los datos del Body en el POST
app.use(express.json());                    // Parsea los datos del Body en el POST
app.use(methodOverride('_method'));         // Sobreescribe los POST cuando usamos "_method"

app.use(express.static(path.resolve(__dirname, 'public')));          // Carpeta de Archivos Estaticos

/* Middlewares de Rutas  */
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/', mainRoutes);

/* Rutas de Error */
app.use(errorRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`));  // Ejecutamos el servidor y mostramos un mensaje por consola