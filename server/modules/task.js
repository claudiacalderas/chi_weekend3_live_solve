var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connectionString = 'postgres://localhost:5432/todotest';

// db name: todotest
// table: todo

router.get( '/', function( req, res ){
  console.log( 'in task get' );

  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      console.log( err );
      res.send( 'poop' );
    } // end error
    else{
      // array for our results
      var results = [];
      // get all records from todo table
      var allTasks = client.query( 'SELECT * FROM todo ORDER BY complete ASC, id DESC' );
      allTasks.on( 'row', function( row ){
        // store each in an array
        results.push( row )
      }); // end each row in allTasks
      allTasks.on( 'end', function(){
        // send the array of results to client
        done();
        res.send( results );
      }); // end on end of allTasks
    } // end no error
  }); //end pg connect

}); //end router get

router.post( '/add', function( req, res ){
  // check that req.body is not empty
  console.log( 'in task/add:', req.body );
  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      // if there was an error connecting to db do not continue
      console.log( err );
      res.send( 'poop' );
    } // end error
    else{
      // no error connecting so create record
      console.log( 'succesfully connected to db');
      // create new record with the req.body.taskName as 'name' field
      client.query( 'INSERT INTO todo ( name, complete) values ( $1, $2 )', [ req.body.taskName, false ] );
      done();
      res.send( 'quack' );
    } // end no error
  }); // end pg connect
}); //end add post route

router.post( '/complete', function( req, res ){
  console.log( 'in task/complete:', req.body );
  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      console.log( err );
      res.send( 'poop' );
    } //end error
    else{
      client.query( 'UPDATE todo SET COMPLETE=true WHERE id=' + req.body.id );
      done();
      res.send( 'woohoooo');
    } // end no error
  });
}); // end post complete

router.delete( '/delete', function( req, res ){
  console.log( 'in task/delete:', req.body );
  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      console.log( err );
      res.send( 'poop' );
    }// end err
    else{
      client.query( 'DELETE FROM todo WHERE id='+ req.body.id );
      res.send( 'hooray' );
    } // end no error
  }); // end pg
  res.send( 'ahhh' );
}); //end delete route

module.exports = router;
