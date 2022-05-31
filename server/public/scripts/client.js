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
        let el = $( '#tasksOut' );
        el.empty();
        for( let i=0; i< response.length; i++){
            el.append( `<li>${response[i].description }, ${ response[i].complete }</li>`);
        }

    }).catch( function( err ){
        console.log( err );
        alert( 'error getting tasks' );
    })
}