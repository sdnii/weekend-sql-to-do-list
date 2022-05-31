$( document ).ready( onReady );

function onReady(){
    console.log('JQ');
    getTasks();
}

function getTasks(){
    console.log( 'in getTasks' );
    // AJAX GET call to /tasks
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        console.log(response);
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting tasks' );
    })
}