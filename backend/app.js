var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors'); // Asegúrate de haber instalado CORS
var mongoose = require('mongoose'); // Importamos Mongoose

// Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRoutes = require('./routes/notes'); // Rutas para las notas
var loginRouter = require('./routes/login');  // Asegúrate de que esto apunte al archivo correcto

var app = express();

// Configuración de MongoDB
const mongoURI = 'mongodb://pablo:1234@localhost:27017/notesAppDB';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3001', // Permite solicitudes de tu frontend
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) fallan al 204
}));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas básicas autogeneradas
app.use('/', indexRouter);

// Ruta para las notas
app.use('/api/notes', notesRoutes);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);  // Verifica que la ruta esté definida de esta manera


module.exports = app;
