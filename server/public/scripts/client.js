$( document ).ready( onReady );

function onReady(){
    console.log('JQ');
    getTasks();
    // click handlers
    $( '#tasksOut' ).on( 'click', '.completeButton', completeTask ); 
    $( '#tasksOut' ).on( 'click', '.deleteButton', deleteTask ); 

}

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
            el.append( `<li>${response[i].description }, ${ response[i].complete }
            <button class="completeButton" data-id="${ response[i].id }">Complete</button>
            <button class="deleteButton" data-id="${ response[i].id }">Delete</button>
            </li>`);
        }

    }).catch( function( err ){
        console.log( err );
        alert( 'error getting tasks' );
    })
}

function completeTask(){
    console.log( 'in completeTask:', $( this ).data( 'id' ) );
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
