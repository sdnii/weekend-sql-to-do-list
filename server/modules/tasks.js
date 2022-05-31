const express = require( 'express' );
const router = express.Router();
const pool = require('../modules/pool');

router.get( '/', ( req, res )=>{
    console.log( '/tasks GET' );
    let queryString = 'SELECT * FROM tasks';
    pool.query(queryString).then((results)=>{
        res.send( results.rows);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })


});

router.delete( '/', ( req, res )=>{
    console.log( '/tasks DELETE:', req.query );
    let queryString = 'DELETE FROM tasks WHERE id=$1';
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

module.exports = router;