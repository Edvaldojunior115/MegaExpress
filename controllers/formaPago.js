const { response, request } = require('express');
const pool = require('../database/data');


// IMPORTANTE: Recordar que hay que específicar los atributos para la tabla Proveedor en cada
// MÉTODO

//Seleccionamos todos los cliente de base de datos

const FormaPagosGet = (req = request, res = response) => {

    const SELECT = 'SELECT * FROM formapago';

    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LAS FORMAS DE PAGOS',
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
            message: 'FORMAS DE PAGOS REGISTRADOS:',
            result
        });

    });

}

const FormaPagoGet = (req = request, res = response) => {

    const IdFormaPAgo = req.query.IdCliente;

    const SELECT = `SELECT * FROM formapago where IdFormaPago = ${IdFormaPAgo}`;


    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LAS FORMAS DE PAGOS',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'NO HAY FORMA DE PAGO REGISTRADA CON ESE ID.'
            });
        }

        res.json({
            ok: true,
            message: 'FORMA DE PAGO REGISTRADA:',
            result
        });

    });

}


//VER TEMA DE LAS CLAVES FORRANEAS. 
//Método para crear un cliente en la base de datos.
const FormaPagoPost = (req, res = response) => {

    const { nombreFormaP, fechaFormaP, descripcionFormaP } = req.body;

    const INSERT = `INSERT INTO proveedor (IdFormaPago, NombreFormaP, FechaFormaP, DescripcionFormaP)
    VALUES (NULL, "${nombreFormaP}", "${fechaFormaP}", "${descripcionFormaP}");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INSERTAR FORMA DE PAGO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'LA FORMA DE PAGO NO HA SIDO AGREGADA.'
            });
        }

        res.json({
            ok: true,
            message: 'LA FORMA DE PAGO HA SIDO AGREGADA CON ÉXITO.',
            idInsertado: result.insertId
        });
    });

}


//Método para la actualización de un cliente.
//Ver método para actualizar solamente los datos nuevos ingresados.
//VER TAMBIÉN EL TEMA DE LAS CLAVES FORRANEAS. 

const FormaPagoPut = (req, res = response) => {

    const { idformapago, nombreFormaP, fechaFormaP, descripcionFormaP } = req.body;

    if (id == '' || id == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL ID DE LA FORMA DE PAGO A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE formapago SET

    NombreFormaP= "${nombreFormaP}",
    FechaFormaP= "${fechaFormaP}",
    DescripcionFormaP= "${descripcionFormaP}" WHERE IdFormaPago = ${idformapago}`;

    pool.query(UPDATE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ACTUALIZAR FORMA DE PAGO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'LA FORMA DE PAGO NO HA SIDO ACTUALIZADA.'
            });
        }

        res.json({
            message: 'FORMA DE PAGO ACTUALIZADA CON ÉXITO.'
        });
    });
}

//** Método para la eliminación de un cliente de la base de datos.
const FormaPagoDelete = (req, res = response) => {

    const idformapago = req.query.Idformapago;

    if (!idformapago) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO ID DE LA FORMA DE PAGO A SER ELIMINADA.'
        });
    }

    const DELETE = `DELETE FROM formapago where IdFormaPago = ${idformapago}`

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR FORMA DE PAGO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'LA FORMA DE PAGO NO HA ELIMINADA.'
            });
        }



        return res.json({
            message: 'FORMA DE PAGO ELIMINADA CON ÉXITO.',
            ID: idformapago
        });

    });
}



module.exports = {
    FormaPagoGet,
    FormaPagosGet,
    FormaPagoPost,
    FormaPagoPut,
    FormaPagoDelete
}