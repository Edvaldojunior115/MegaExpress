const mysql = require('mysql');

const configuracionBD = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'megaexpress'
}

//Para eficiencia creamos un pool de MySQL, que nos permite utilizar mĂșltiples conexiones
//a la vez en lugar de tener que manualmente abrir y cerrar conexiones mĂșltiples.
const pool = mysql.createPool(configuracionBD);


module.exports = pool;