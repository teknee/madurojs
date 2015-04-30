var maduro = require( "./dist/maduro.js" );

console.log( maduro.version );
console.info( maduro.utils );

var list = maduro.linkedList();
list.insert(2);
list.insert(3);
list.insert(4, 2);
console.log("message", list.find(2));
console.log("message", list.find(3));
console.log("message", list.find(4));
