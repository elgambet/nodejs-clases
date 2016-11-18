/**
* NodeJS - Clase 1 - Código asincrónico
* 
* Este ejemplo conciste en iniciar un servidor web con nodejs y probar la utilización
* de métodos asincrónicos.
*
* Modo de uso
* -----------
* 1) Ejecutar en una terminal: node 1_codigo_async.js
* 2) Abrir un navegador e ingresar a http://localhost:2016/lenta
* 3) Abrir una nueva pestaña e ingresar a http://localhost:2016/rapida
* 4) Notaremos que aunque la ejecución rápida no posee el código bloqueante, la
*    misma debe esperar a que el paso 2 termine.
* 5) Ahora repetir los pasos 3 y 4, pero reemplazando http://localhost:2016/rapida
*    por http://localhost:2016/lenta-timeout
* 6) Ahora notaremos que el la ejecución del método "rapida" se ejecuta sin la necesidad
*    de esperar a que finalicé la operación lenta.
**/

// Incluimos los modulos necesarios
var express = require('express')
    ,app    = express()
    ,http   = require('http');

// Creamos el servidor HTTP
var server = http.createServer(app);

// Función que bloquea la ejecución de código hasta que transcurra 
// una determinada cantidad de milisegundos.
function esperar(milisegundos) {
  var esperarhasta = new Date(new Date().getTime() + milisegundos);
  while(esperarhasta > new Date()){};
  return true
}

// Operacion bloqueante - hasta que no termine no se ejecutará la funcion rapida
app.get('/lenta', function(req, res, next) {
  esperar(10000);
  return res.send('LA FUNCION LENTA TERMINO');
});

// Como primera solución, intentaríamos forzar que sea asincrónico utilizando callbacks
// ------------------------------------------------------------------------------------
// Si realizamos la prueba veremos que enrealidad esto no nos resuelve el problema, ya 
// que el código esperar() sigue corriendo en el stack principal de nodejs, y por lo tanto
// esta bloqueando la ejecución del resto de nuestro código.
var asyncFake = function(callback){
  esperar(10000);
  return callback();
};
app.get('/lenta-callback', function(req, res, next) {
  lentaCallback(function(){
    return res.send('LA FUNCION LENTA-CALLBACK TERMINO');
  });
});

// Ejemplo real de una operación asincrónica
app.get('/lenta-timeout', function(req, res, next) {
  setTimeout(function(){
    return res.send('LA FUNCION LENTA-TIMEOUT TERMINO');
  }, 10000);
});

app.get('/rapida', function(req, res, next) {
  return res.send('LA FUNCION RAPIDA TERMINO');
});

// Inicializamos el servidor en el puerto 2016
server.listen(2016, function() {
  var address = server.address().address;
  var host = address && address !== '::' ? address : 'localhost',
  port = server.address().port;
  console.info('[Clase UNO - CODIGO ASINCRONICO]');
  console.info('Modo de uso');
  console.info('-----------');
  console.info('1) Abrir un navegador e ingresar a http://localhost:2016/lenta');
  console.info('2) Abrir una nueva pestaña e ingresar a http://localhost:2016/rapida');
  console.info('3) Notaremos que aunque la ejecución rápida no posee el código bloqueante, la');
  console.info('   misma debe esperar a que el paso 1 termine.');
  console.info('4) Ahora repetir los pasos 2 y 3, pero reemplazando http://localhost:2016/rapida');
  console.info('   por http://localhost:2016/lenta-timeout');
  console.info('5) Ahora notaremos que el la ejecución del método "rapida" se ejecuta sin la necesidad');
  console.info('   de esperar a que finalicé la operación lenta.');
  console.info('-------> Escuchando en http://%s:%s', host, port);
});

module.exports = app;