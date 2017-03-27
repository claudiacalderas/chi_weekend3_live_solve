// requires
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var port = 6789;
var index =require( './modules/index.js' );
var task =require( './modules/task.js' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/', index );
app.use( '/task', task );

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end server up
