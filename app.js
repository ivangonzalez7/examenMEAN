var express         = require("express"),// Express: Framework HTTP para Node.js
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');  // Mongoose: Libreria para conectar con MongoDB
    logger          = require('morgan');
    path            = require('path');
    favicon         = require('serve-favicon');
    crypto          = require('crypto');
    cookieParser    = require('cookie-parser');
    passport        = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
    cors      = require('cors');


var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

require('mongoose-middleware').initialize(mongoose);



// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://localhost/examenMEAN', function(err, res) {if(err) throw err;console.log('Conectado correctamente a la Base de Datos');});

// Iniciamos la aplicación Express
var app = express();
var server = require('http').Server(app);



app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Middlewares de Express que nos permiten enrutar y poder realizar peticiones HTTP (GET, POST, PUT, DELETE)
//Funciones importantes para subir archivos
//app.use(bodyParser());
//app.use(bodyParser({uploadDir:'./images'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());


// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//API rutas
routes = require('./routes/estudiantes')(app);
routes = require('./routes/asignaturas')(app);


server.listen(3000, function() {
  console.log("Servidor escuchando en, http://localhost:3000");
});
