/**
* Ejemplo de un módulo propio
**/

// La asignación al exports tiene que ser inmediata, 
// no podemos hacerla en callbacks, por ejemplo esto no funciona:
/*
setTimeout(function() {
   module.exports.algo = true;
}, 100);
*/

// Esta variable es privada, sólo se encuentra disponible en este módulo
var mensaje = 'NodeJS ROCKS';

// De esta forma disponibilizamos la función obtener de este módulo
exports.obtener = function (){
  var signos = ' !!!';
  return mensaje + signos;
};