const { response } = require('express');
const pool = require('../database/data');


//Seleccionamos todos los cliente de base de datos
const ProductosGet = (req = request, res = response) => {

    const SELECT = 'SELECT * FROM producto';

    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS PRODUCTO',
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
            message: 'PRODUCTO REGISTRADOS:',
            result
        });

    });

}

const ProductoGet = (req = request, res = response) => {

    const { IdProducto } = req.body;

    const SELECT = `SELECT * FROM proveedor where IdProducto= ${IdProducto}`;


    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR MOSTRAR LOS PRODUCTOS',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'NO HAY PRODUCTO REGISTRADO.'
            });
        }

        res.json({
            ok: true,
            message: 'PRODUCTO REGISTRADO:',
            result
        });

    });

}


//Método para crear un cliente en la base de datos.
const AgregarProducto = (req, res = response) => {

    const { NombreProducto, DescripcionProducto, CantidadProducto, PrecioUnitProducto, PorcentajeGananciaProducto } = req.body;

    // console.log('AGREGAR PRODUCTO:', NombreProducto);

    const INSERT = `INSERT INTO producto (IdProducto, NombreProdu, DescripcionProdu, CantidadProdu, PrecioUnitProdu, PorcentajeGananciaProdu)
    VALUES (NULL, "${NombreProducto}", "${DescripcionProducto}", "${CantidadProducto}", "${PrecioUnitProducto}", "${PorcentajeGananciaProducto}");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INSERTAR PRODUCTO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PRODUCTO NO HA SIDO AGREGADO.'
            });
        }

        res.json({
            ok: true,
            message: 'EL PRODUCTO HA SIDO AGREGADO CON ÉXITO.',
            idInsertado: result.insertId
        });
    });

}


//Método para la actualización de un cliente.
//Ver método para actualizar solamente los datos nuevos ingresados. 
const ProductoPut = (req, res = response) => {

    const { idProducto, NombreProducto, DescripcionProducto, CantidadProducto, PrecioUnitProducto, PorcentajeGananciaProducto } = req.body;

    if (idProducto == '' || idProducto == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL ID DEL PRODUCTO A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE producto SET
    NombreProdu= "${NombreProducto}",
    DescripcionProdu= "${DescripcionProducto}",
    CantidadProdu= "${CantidadProducto}",
    PrecioUnitProdu= "${PrecioUnitProducto}",
    PorcentajeGananciaProdu= "${PorcentajeGananciaProducto}" WHERE IdProducto = ${idProducto}`;

    pool.query(UPDATE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ACTUALIZAR PRODUCTO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PRODUCTO NO HA SIDO ACTUALIZADO.'
            });
        }

        res.json({
            message: 'PRODUCTO ACTUALIZADO CON ÉXITO.'
        });
    });
}

//** Método para la eliminación de un cliente de la base de datos.
const ProductoDelete = (req, res = response) => {

    const { idProducto } = req.body;

    if (idProducto == '' || idProducto == undefined) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL PRODUCTO A SER ELIMINADO.'
        });
    }

    const DELETE = `DELETE FROM producto where IdProducto =${idProducto}`

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR PRODUCTO EN BASE DE DATOS.',
                err
            });
        }

        return res.json({
            message: 'PRODUCTO ELIMINADO CON ÉXITO.',
            ID: idProducto
        });

    });
}


module.exports = {
    ProductoGet,
    ProductosGet,
    ProductoPut,
    AgregarProducto,
    ProductoDelete
}