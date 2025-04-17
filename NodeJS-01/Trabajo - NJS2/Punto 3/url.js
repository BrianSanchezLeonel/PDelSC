const url = require('url');

const urlEjemplo = 'http://localhost:3000/productos?categoria=libros&id=123';

const parsedUrl = url.parse(urlEjemplo, true); 

console.log('Host:', parsedUrl.host);          
console.log('Hostname:', parsedUrl.hostname); 
console.log('Puerto:', parsedUrl.port);       
console.log('Pathname:', parsedUrl.pathname);  
console.log('Query:', parsedUrl.query);       
console.log('Ruta completa:', parsedUrl.path); 