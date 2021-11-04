const { response, request } = require('express');
const pool = require('../database/data');


// IMPORTANTE: Recordar que hay que específicar los atributos para la tabla Proveedor en cada
// MÉTODO

//Seleccionamos todos los cliente de base de datos

const RubrosGet = (req = request, res = response) => {

    const SELECT = 'SELECT * FROM rubro';

    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS RUBROS',
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
            message: 'RUBROS REGISTRADOS:',
            result
        });

    });

}

const RubroGet = (req = request, res = response) => {

    const IdRubro = req.query.IdCliente;

    const SELECT = `SELECT * FROM rubro where IdRubro = ${IdRubro}`;

    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS RUBROS',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'NO HAY RUBRO REGISTRADO CON ESE ID.'
            });
        }

        res.json({
            ok: true,
            message: 'RUBRO REGISTRADO:',
            result
        });

    });

}



//Método para crear un cliente en la base de datos.
const RubroPost = (req, res = response) => {

    const { NombreRubro, DescripcionRubro } = req.body;

    const INSERT = `INSERT INTO rubro (IdRubro, NombreRubro, DescripcionRubro) VALUES (NULL, "${NombreRubro}", "${DescripcionRubro}");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INSERTAR RUBRO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL RUBRO NO HA SIDO AGREGADO.'
            });
        }

        res.json({
            ok: true,
            message: 'EL RUBRO HA SIDO AGREGADO CON ÉXITO.',
            idInsertado: result.insertId
        });
    });

}


//Método para la actualización de un cliente.
//Ver método para actualizar solamente los datos nuevos ingresados. 

const RubroPut = (req, res = response) => {

    const { id, nombreRubro, descripcionRubro } = req.body;

    if (id == '' || id == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL ID DEL RUBRO A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE rubro SET

    NombreRubro= "${nombreRubro}",
    DescripcionRubro= "${descripcionRubro}" WHERE IdCliente = ${id}`;

    pool.query(UPDATE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ACTUALIZAR RUBRO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL RUBRO NO HA SIDO ACTUALIZADO.'
            });
        }

        res.json({
            message: 'RUBRO ACTUALIZADO CON ÉXITO.'
        });
    });
}

//** Método para la eliminación de un cliente de la base de datos.
const RubroDelete = (req, res = response) => {

    const IdRubro = req.query.IdCliente;

    if (!IdRubro) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL RUBRO A SER ELIMINADO.'
        });
    }

    const DELETE = `DELETE FROM rubro where IdRubro =${IdRubro}`;

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR RUBRO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL RUBRO NO HA ELIMINADO.'
            });
        }



        return res.json({
            message: 'RUBRO ELIMINADO CON ÉXITO.',
            ID: IdCliente
        });

    });
}



module.exports = {
    RubroGet,
    RubrosGet,
    RubroPost,
    RubroPut,
    RubroDelete
}