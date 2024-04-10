var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Asegúrate de haber instalado CORS

// Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRoutes = require('./routes/notes'); // Rutas para las notas

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // Habilita CORS
app.use(express.static(path.join(__dirname, 'public')));

// Rutas básicas autogeneradas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Ruta para las notas
app.use('/api/notes', notesRoutes);

module.exports = app;
