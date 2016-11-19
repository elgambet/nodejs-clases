/**
* NodeJS - Clase 1 - Ejemplo servidor web
* 
* Este ejemplo conciste en iniciar un servidor web con nodejs y mostrar un hola mundo
*
* Modo de uso
* -----------
* 1) Ejecutar en una terminal: node hola_mundo.js
* 2) Abrir un navegador e ingresar a http://127.0.0.1:8080
**/

// Incluir http
var http  = require('http')
    ,host = '127.0.0.1'
    ,port = 8080;

// Crear un servidor web
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hola Mundo');
});

// El servidor web debe correr en localhost y en el puerto 8080
server.listen(port, function() {
  console.info('[Clase UNO - HOLA MUNDO]');
  console.info('Modo de uso');
  console.info('-----------');
  console.info('1) Abrir un navegador e ingresar a http://%s:%s', host, port);
});
