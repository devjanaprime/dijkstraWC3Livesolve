// requries
const express = require( 'express' );
const router = express.Router();
const pool = require( '../modules/pool' );
// get
router.get( '/', ( req, res )=>{
    console.log( 'in /items GET' );
    let queryString = `SELECT * FROM "to-do"`;
    // run the query
    pool.query( queryString).then( ( result )=>{
        // if successful send status 201
        res.send( result.rows );
    }).catch( ( err )=>{
        // end log error & send 500
        console.log( err );
        res.sendStatus( 500 );
    }) // end query
}) //end GET
// post
router.post( '/', ( req, res )=>{
    console.log( 'in /items POST:', req.body );
    // create a query string
    let queryString = `INSERT INTO "to-do" (task) VALUES ($1)`;
    // run the query
    pool.query( queryString, [ req.body.task ] ).then( ( result )=>{
        // if successful send status 201
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        // end log error & send 500
        console.log( err );
        res.sendStatus( 500 );
    }) // end query
}) //end POST
// put
router.put( '/:id', ( req, res )=>{
    console.log( 'in /items PUT:', req.params );
    queryString = `UPDATE "to-do" SET complete = TRUE where id=($1)`;
    pool.query( queryString, [ req.params.id ] ).then( ( result )=>{
        res.sendStatus( 200 )
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    }) //end UPDATE
}) //end PUT
// delete
router.delete( '/:id', ( req, res )=>{
    console.log( 'in /items DELETE:', req.params );
    let queryString = `DELETE FROM "to-do" WHERE id= ($1)`;
    pool.query( queryString, [ req.params.id ] ).then( ( result )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        res.sendStatus( 500 );
    }) //end query
}) //end DELETE
// exports
module.exports = router;