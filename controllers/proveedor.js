const { response, request } = require('express');
const pool = require('../database/data');


// IMPORTANTE: Recordar que hay que específicar los atributos para la tabla Proveedor en cada
// MÉTODO

//Seleccionamos todos los proveedores de base de datos

const ProveedoresGet = (req = request, res = response) => {

    const SELECT = 'SELECT * FROM proveedor';

    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS PROVEEDOR',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'BASE DE DATOS VACÍA'
            });
        }

        res.json({
            ok: true,
            message: 'PROVEEDOR REGISTRADOS:',
            result
        });

    });

}

const ProveedorGet = (req = request, res = response) => {

    const IdCliente = req.query.IdCliente;

    const SELECT = `SELECT * FROM proveedor where Statuscli = 1 AND IdCliente = ${IdCliente}`;


    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS PROVEEDOR',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'NO HAY PROVEEDOR REGISTRADO.'
            });
        }

        res.json({
            ok: true,
            message: 'PROVEEDOR REGISTRADOS:',
            result
        });

    });

}



//Método para crear un cliente en la base de datos.
const ProveedorPost = (req, res = response) => {

    const { Nombre, Apellido, DNI, Domicilio, Localidad, Email, Fecha, Telefono, Cuit, CTACTE } = req.body;

    const INSERT = `INSERT INTO proveedor (IdCliente, NombreCli, ApellidoCli, DNICli, DomicilioCli, LocalidadCli, EmailCli, FechaCli, TelefonoCli, CuitCli, CTACTECli, StatusCli)
    VALUES (NULL, "${Nombre}", "${Apellido}", "${DNI}", "${Domicilio}", "${Localidad}", "${Email}", "${Fecha}", "${Telefono}", "${Cuit}", "${CTACTE}", "1");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INSERTAR PROVEEDOR EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PROVEEDOR NO HA SIDO AGREGADO.'
            });
        }

        res.json({
            ok: true,
            message: 'EL PROVEEDOR HA SIDO AGREGADO CON ÉXITO.',
            idInsertado: result.insertId
        });
    });

}


//Método para la actualización de un cliente.
//Ver método para actualizar solamente los datos nuevos ingresados. 

const ProveedorPut = (req, res = response) => {

    const { id, Nombre, Apellido, DNI, Domicilio, Localidad, Email, Fecha, Telefono, Cuit, CTACTE } = req.body;

    if (id == '' || id == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL ID DEL PROVEEDOR A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE proveedor SET 

    
    WHERE IdCliente = ${id} AND StatusCli = 1`;

    pool.query(UPDATE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ACTUALIZAR PROVEEDOR EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PROVEEDOR NO HA SIDO ACTUALIZADO.'
            });
        }

        res.json({
            message: 'PROVEEDOR ACTUALIZADO CON ÉXITO.'
        });
    });
}

//** Método para la eliminación de un cliente de la base de datos.
const ProveedorDelete = (req, res = response) => {

    const IdCliente = req.query.IdCliente;

    if (!IdCliente) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL PROVEEDOR A SER ELIMINADO.'
        });
    }

    const DELETE = `UPDATE proveedor SET StatusCli = 0 where IdCliente =${IdCliente}`

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR PROVEEDOR EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PROVEEDOR NO HA ELIMINADO.'
            });
        }



        return res.json({
            message: 'PROVEEDOR ELIMINADO CON ÉXITO.',
            ID: IdCliente
        });

    });
}



module.exports = {
    ProveedorGet,
    ProveedoresGet,
    ProveedorPost,
    ProveedorPut,
    ProveedorDelete
}