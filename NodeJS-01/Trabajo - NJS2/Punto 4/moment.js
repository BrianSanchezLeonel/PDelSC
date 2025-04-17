const moment = require('moment');

console.log(moment().format());         
console.log(moment().format('DD/MM/YYYY'));    
console.log(moment().add(7, 'days').calendar());