/**
* NodeJS - Clase 2 - Ejemplo módulos
* 
* Este ejemplo conciste en iniciar un servidor web con nodejs y probar la inclusión
* de módulos
*
* Modo de uso
* -----------
* 1) Ejecutar npm install
* 2) Ejecutar en una terminal: node ejemplo_modulos.js
* 2) Abrir un navegador e ingresar a http://localhost:8080/
**/

// Incluimos un módulo en node_modules
var express = require('express');

// Incluimos un módulo CORE
var http   = require('http');

// Incluimos un módulo PROPIO
var mensaje = require('./modulos/mi_modulo.js');

// Definimos variables propias
var app   = express()    
    ,host = '127.0.0.1'
    ,port = 8080;

// Creamos el servidor HTTP
var server = http.createServer(app);

// Mostramos el mensaje del módulo propio
app.get('/mostrar', function(req, res, next) {
  return res.send(mensaje.obtener());
});

// Inicializamos el servidor en el puerto 2016
server.listen(port, function() {
  console.info('[Clase DOS - EJEMPLO MODULOS]');
  console.info('Modo de uso');
  console.info('-----------');
  console.info('1) Abrir un navegador e ingresar a http://%s:%s/mostrar', host, port);
});

module.exports = app;