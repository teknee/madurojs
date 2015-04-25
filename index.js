var maduro = require( "./dist/maduro.js" );

console.log( maduro.version );
console.info( maduro.utils );

var list = maduro.linkedList();
console.log( list.find(1) );