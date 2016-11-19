/**
* NodeJS - Clase 2 - Ejemplo FS
* 
* Este ejemplo conciste en iniciar un servidor web con nodejs y probar la inclusión
* de archivos, tanto de forma asincrónica como sincrónica.
*
* Modo de uso
* -----------
* 1) Ejecutar npm install
* 2) Ejecutar en una terminal: node ejemplo_fs.js
* 2) Abrir un navegador e ingresar a http://localhost:8080/
**/

// Incluimos los módulos necesarios
var express = require('express');
var http    = require('http');
var fs      = require('fs');

// Definimos variables propias
var app   = express()    
    ,host = '127.0.0.1'
    ,port = 8080;

// Creamos el servidor HTTP
var server = http.createServer(app);

// Cargamos el archivo de forma asincrónica y lo mostramos
app.get('/async', function(req, res, next) {
  fs.readFile('archivos/archivo_async.txt', 'utf8', function(err, data) {
    if (err) throw err;
    return res.send(data.toString());
  });
});

// Cargamos el archivo de forma sincrónica y lo mostramos
app.get('/sync', function(req, res, next) {
  var data = fs.readFileSync('archivos/archivo_sync.txt');
  return res.send(data.toString());
});

// Inicializamos el servidor en el puerto 2016
server.listen(port, function() {
  console.info('[Clase DOS - EJEMPLO FS]');
  console.info('Modo de uso');
  console.info('-----------');
  console.info('1) Abrir un navegador e ingresar a http://%s:%s/async', host, port);
  console.info('2) Abrir un navegador e ingresar a http://%s:%s/sync', host, port);
});

module.exports = app;