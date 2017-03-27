$( document ).ready( function(){

  var getTasks = function(){
    console.log( 'in getTasks' );
    // get cal to /task
    $.ajax({
      type: 'get',
      url: '/task',
      success: function( response ){
        console.log( 'back from /task with:', response );
        // empty the outputDiv
        var output = $( '#outputDiv' );
        output.empty();
        // loop through the results
        for (var i = 0; i < response.length; i++) {
          // display each on DOM
          // change how completed tasks are displayed
          if( response[i].complete ){
            output.append('<p>' + response[i].name + '</p>' );
          } // end complete
          else{
            output.append('<p><b>' + response[i].name + '<b><button class="completeTaskButton" data-id=' + response[i].id + '>Complete</button><button class="deleteTaskButton" data-id=' + response[i].id + '>Delete</button></p>' );
          } // end not complete
          // display tasks sorte by completion
        } // end for
      } // end success
    }); // end ajax
  }; //end getTasks

  $( '#addTaskButton' ).on( 'click', function(){
    console.log( 'in addTaskButton on click');
    // get user input
    // assemble object to send
    var objectToSend = {
      taskName : $( '#taskNameIn' ).val()
    }; // end objectToSend
    console.log( 'sending:', objectToSend );
    // send object to server
    $.ajax({
      type: 'POST',
      url: 'task/add',
      data: objectToSend,
      success: function( response ){
        // if successful create, update display
        console.log( 'back from add task with:', response);
        getTasks();
      }
    }); // end ajax
  }); // end addTaskButton on click

  $( '#outputDiv' ).on( 'click', '.completeTaskButton', function(){
    var myId = $( this ).data( 'id' );
    console.log( 'in outputDiv on click completeTaskButton for id:', myId );
    // call tack/complete and send this id
    var objectToSend = {
      id: myId
    }; //end objectToSend
    $.ajax({
      type: 'post',
      data: objectToSend,
      url: 'task/complete',
      success: function( response ){
        console.log( 'complete?');
        getTasks();
      } // end success
    }); // end ajax
  }); // end outputDiv on click completeTaskButton

  $( '#outputDiv' ).on( 'click', '.deleteTaskButton', function(){
    var myId = $( this ).data( 'id' );
    console.log( 'in outputDiv on click deleteTaskButton for id:', myId );
    // call tack/complete and send this id
    var objectToSend = {
      id: myId
    }; //end objectToSend
    $.ajax({
      type: 'delete',
      data: objectToSend,
      url: 'task/delete',
      success: function( response ){
        console.log( 'delete');
        getTasks();
      } // end success
    }); // end ajax
  }); // end outputDiv on click deleteTaskButton


  getTasks();
});
