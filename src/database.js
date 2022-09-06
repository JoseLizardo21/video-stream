const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection)=>{
    if(err){
        console.log('Some error occurred');
    }
    if(connection){
        console.log('Db is connected');
    }
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;