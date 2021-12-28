const { response, request } = require('express');
const pool = require('../database/data');


//Seleccionamos todos los cliente de base de datos

const ClientesGet = (req = request, res = response) => {

    const SELECT = 'SELECT * FROM Cliente';

    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS CLIENTES',
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
            message: 'CLIENTES REGISTRADOS:',
            result
        });

    });

}

const ClienteGet = (req = request, res = response) => {

    const { DNI } = req.body;

    const SELECT = `SELECT * FROM Cliente where Statuscli = 1 AND IdCliente = ${DNI}`;


    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS CLIENTES',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'NO HAY CLIENTE REGISTRADO.'
            });
        }

        res.json({
            ok: true,
            message: 'CLIENTE REGISTRADO CON EL LEGAJO ESPECÍFICADO:',
            result
        });

    });

}



//Método para crear un cliente en la base de datos.
const ClientePost = (req, res = response) => {

    const { Nombre, Apellido, DNI, Domicilio, Localidad, Email, Fecha, Telefono, Cuit, CTACTE } = req.body;

    const INSERT = `INSERT INTO cliente (IdCliente, NombreCli, ApellidoCli, DNICli, DomicilioCli, LocalidadCli, EmailCli, FechaCli, TelefonoCli, CuitCli, CTACTECli, StatusCli)
    VALUES (NULL, "${Nombre}", "${Apellido}", "${DNI}", "${Domicilio}", "${Localidad}", "${Email}", "${Fecha}", "${Telefono}", "${Cuit}", "${CTACTE}", "1");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INSERTAR CLIENTE EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL CLIENTE NO HA SIDO AGREGADO.'
            });
        }

        return res.json({
            ok: true,
            message: 'EL CLIENTE HA SIDO AGREGADO CON ÉXITO.',
            idInsertado: result.insertId
        });
    });

}


//Método para la actualización de un cliente.
//Ver método para actualizar solamente los datos nuevos ingresados. 

const ClientePut = (req, res = response) => {

    const { id, Nombre, Apellido, DNI, Domicilio, Localidad, Email, Fecha, Telefono, Cuit, CTACTE } = req.body;

    if (DNI == '' || DNI == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL DNI DEL CLIENTE A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE cliente SET 
            NombreCli= "${Nombre}",
            ApellidoCli= "${Apellido}",
            DNICli= "${DNI}",
            DomicilioCli= "${Domicilio}",
            LocalidadCli= "${Localidad}",
            EmailCli= "${Email}",
            FechaCli= "${Fecha}",
            TelefonoCli= "${Telefono}",
            CuitCli= "${Cuit}",
            CTACTECli= "${CTACTE}" WHERE DNI = ${DNI} AND StatusCli = 1`;

    pool.query(UPDATE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ACTUALIZAR CLIENTE EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL CLIENTE NO HA SIDO ACTUALIZADO.'
            });
        }

        res.json({
            message: 'CLIENTE ACTUALIZADO CON ÉXITO.'
        });
    });
}

//** Método para la eliminación de un cliente de la base de datos.
const ClienteDelete = (req, res = response) => {

    const { DNI } = req.body;

    if (!DNI) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL DNI DEL USUARIO A SER ELIMINADO.'
        });
    }

    const DELETE = `UPDATE cliente SET StatusCli = 0 where DNI =${DNI}`

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR CLIENTE EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL CLIENTE NO HA ELIMINADO.'
            });
        }



        return res.json({
            message: 'CLIENTE ELIMINADO CON ÉXITO.',
            ID: IdCliente
        });

    });
}


//** Método para la ACTIVAR NUEVAMENTE UN USUARIO QUE HA SIDO ELIMINADO.
const ActivarCliente = (req, res = response) => {

    const { DNI } = req.body;

    if (!DNI) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL DNI DEL USUARIO A SER ELIMINADO.'
        });
    }

    const DELETE = `UPDATE cliente SET StatusCli = 0 where DNI  =${DNI}`

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL REACTIVAR EL CLIENTE EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL CLIENTE NO HA SIDO REACTIVADO.'
            });
        }



        return res.json({
            message: 'CLIENTE HA SIDO REACTIVADO CON ÉXITO.',
            ID: IdCliente
        });

    });
}



module.exports = {
    ClientesGet,
    ClienteGet,
    ClientePost,
    ClientePut,
    ClienteDelete,
    ActivarCliente
}