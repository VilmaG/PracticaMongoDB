//console.log('Hola mundo');

const express = require('express'); //de esta forma se importa en node
require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');

//Creando el servidor express
const app = express();

//configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//conexio a la BD
dbConection();

//console.log(process.env);

//Rutas de la API
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/proveedores', require('./routes/proveedores.routes'));
app.use('/api/productos',require('./routes/productos.routes'));
app.use('/api/empleados',require('./routes/empleados.routes'));
app.use('/api/clientes',require('./routes/clientes.routes'));
app.use('/api/ordenpedidos',require('./routes/ordenpedido.routes'));
app.use('/api/busqueda', require('./routes/busquedas.routes'));
//Para levantar el servidor
app.listen(process.env.PORT, ()=>{
console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})

// STRING DE CONEXION:mongodb+srv://adminproject:<password>@cluster0.gjafd.mongodb.net/test
