const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    //MIS RUTAS
    routes() {

        this.app.use('/api/usuarios', require('../routes/usuarios'));
        this.app.use('/api/tablas', require('../routes/tablas'));
        this.app.use('/api/login', require('../routes/login'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR CORRIENDO EN EL PUERTO: ', this.port);
        });
    }

}


module.exports = Server;