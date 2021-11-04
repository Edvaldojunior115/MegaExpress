const { response, request } = require('express');
const pool = require('../database/data');


// IMPORTANTE: Recordar que hay que específicar los atributos para la tabla Proveedor en cada
// MÉTODO

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

    const IdProducto = req.query.idproducto;

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
const ProductoPost = (req, res = response) => {

    const { NombreProducto, DescripcionProducto, cantidadMinimaStockProducto, PrecioUnitProducto, PorcentajeGananciaProducto } = req.body;

    const INSERT = `INSERT INTO producto (IdProducto, NombreProdu, DescripcionProdu, cantidadMinimaStockProdu, PrecioUnitProdu, PorcentajeGananciaProdu)
    VALUES (NULL, "${NombreProducto}", "${DescripcionProducto}", "${cantidadMinimaStockProducto}", "${PrecioUnitProducto}", "${PorcentajeGananciaProducto}");`;

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

    const { id, NombreProducto, DescripcionProducto, cantidadMinimaStockProducto, PrecioUnitProducto, PorcentajeGananciaProducto } = req.body;

    if (id == '' || id == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL ID DEL PRODUCTO A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE proveedor SET
    
    NombreProdu= "${NombreProducto}",
    DescripcionProdu= "${DescripcionProducto}",
    CantidadMinimaStockProdu= "${cantidadMinimaStockProducto}",
    PrecioUnitProdu= "${PrecioUnitProducto}",
    PorcentajeGananciaProdu= "${PorcentajeGananciaProducto}" 
    WHERE IdProcuto = ${id}`;

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

    const IdProdcuto = req.query.IdCliente;

    if (!IdProdcuto) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL PRODUCTO A SER ELIMINADO.'
        });
    }

    const DELETE = `DELETE FROM producto where IdProducto =${IdProdcuto}`

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR PRODUCTO EN BASE DE DATOS.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PRODUCTO NO HA ELIMINADO.'
            });
        }



        return res.json({
            message: 'PRODUCTO ELIMINADO CON ÉXITO.',
            ID: IdProdcuto
        });

    });
}



module.exports = {
    ProductoGet,
    ProductosGet,
    ProductoPost,
    ProductoPut,
    ProductoDelete
}