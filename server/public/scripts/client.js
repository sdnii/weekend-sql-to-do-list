$( document ).ready( onReady );

function onReady(){
    console.log('JQ');
    getTasks();
    // click handlers
    $('#addTaskButton').on( 'click', addTask ); 
    $( '#tasksOut' ).on( 'click', '.completeButton', completeTask ); 
    $( '#tasksOut' ).on( 'click', '.deleteButton', deleteTask ); 

}

function addTask(){
    console.log( 'in addTask' );
    let newTask = {
	    description: $('#tasksIn' ).val()
    }
    console.log( 'sending:', newTask );
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error adding task' );
    })
} // end addItem

function getTasks(){
    console.log( 'in getTasks' );
    // AJAX GET call to /tasks
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        console.log(response);
        let el = $( '#tasksOut' );
        el.empty();
        for( let i=0; i< response.length; i++){
            let completeString = '';
            if(response[i].complete){
                completeString = "COMPLETE"
            }
            el.append( `<li>${response[i].description }, ${ response[i].complete }
            <button class="completeButton" data-id="${ response[i].id }">Complete</button>
            <button class="deleteButton" data-id="${ response[i].id }">Delete</button>
           ${completeString}
            </li>`);
        }

    }).catch( function( err ){
        console.log( err );
        alert( 'error getting tasks' );
    })
}

function completeTask(){
    console.log( 'in completeTask:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'PUT',
        url: '/tasks?id=' + $( this ).data( 'id' ) 
    }).then( function( response ){
        console.log( response );
        getTasks(); 
    }).catch( function( err ){
        console.log( err );
        alert( 'error completing task' );
    })
}

function deleteTask(){
    console.log( 'in deleteTask:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'DELETE',
        url: `/tasks?id=${ $( this ).data( 'id' )  }`
    }).then( function( response ){
        console.log( response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error deleting task' );
    })
}
