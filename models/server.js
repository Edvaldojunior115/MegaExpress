const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Middlewares
        this.middlewares();
        // INICIALIZACIÓN DE LAS RUTAS
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

    //RUTAS DE MI SISTEMA
    routes() {

        this.app.use('/api/loginUSER', require('../routes/login'));
        this.app.use('/api/producto', require('../routes/producto'));
        this.app.use('/api/proveedor', require('../routes/proveedor'));
        this.app.use('/api/rubro', require('../routes/rubro'));
        this.app.use('/api/tablas', require('../routes/tablas'));
        this.app.use('/api/usuarios', require('../routes/usuarios'));
        this.app.use('/api/formaPago', require('../routes/formaPago'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR CORRIENDO EN EL PUERTO: ', this.port);
        });
    }

}


module.exports = Server;