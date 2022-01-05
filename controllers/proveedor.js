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
                message: 'ERROR AL INTENTAR MOSTRAR LOS PROVEEDORES',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'NO EXISTE NINGÚN PROVEEDOR REGISTRADO'
            });
        }

        res.json({
            ok: true,
            message: 'PROVEEDORES REGISTRADOS:',
            result
        });

    });

}

const ProveedorGet = (req = request, res = response) => {

    const { IdProveedor } = req.body;

    const SELECT = `SELECT * FROM proveedor where IdProveedor = ${IdProveedor}`;


    pool.query(SELECT, (err, result) => {

        if (err) {
            res.json({

                ok: false,
                message: 'ERROR AL INTENTAR AL CONSULTAR POR EL PROVEEDOR',
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
            message: 'PROVEEDOR REGISTRADO:',
            result
        });

    });

}



//Método para crear un PROVEEDOR en la base de datos.
const ProveedorPost = (req, res = response) => {

    const {
        NombreProveedor,
        VendedorProveedor,
        ResponsableInscripto,
        EmailProveedor,
        LocalidadProveedor,
        DireccionProveedor
    } = req.body;

    const INSERT = `INSERT INTO proveedor (IdProveedor, NombreProveedor, VendedorProveedor, ResponsableInscripto, EmailProveedor, LocalidadProveedor, DireccionProveedor)
    VALUES (NULL, "${NombreProveedor}", "${VendedorProveedor}", "${ResponsableInscripto}", "${EmailProveedor}", "${LocalidadProveedor}", "${DireccionProveedor}");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INSERTAR PROVEEDOR: ',
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

    //Capturamos los datos que viene en el cuerpo y asignamos a cada una de las variables.
    const {
        IdProveedor,
        NombreProveedor,
        VendedorProveedor,
        ResponsableInscripto,
        EmailProveedor,
        LocalidadProveedor,
        DireccionProveedor
    } = req.body;

    if (IdProveedor == '' || IdProveedor == undefined) {

        return res.json({
            ok: false,
            message: 'ES NECESARIO ESPECIFICAR EL ID DEL PROVEEDOR A ACTUALIZAR.'
        });
    }


    const UPDATE = `UPDATE proveedor SET NombreProveedor = "${NombreProveedor}", VendedorProveedor = "${VendedorProveedor}",
    ResponsableInscripto = "${ResponsableInscripto}",
    EmailProveedor = "${EmailProveedor}",
    LocalidadProveedor = "${LocalidadProveedor}",
    DireccionProveedor = "${DireccionProveedor}" WHERE  IdProveedor = ${IdProveedor}`;


    pool.query(UPDATE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INTENTAR ACTUALIZAR PROVEEDOR.',
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
            ok: true,
            message: 'PROVEEDOR ACTUALIZADO CON ÉXITO.',
            ID: IdProveedor
        });
    });
}

//** Método para la eliminación de un cliente de la base de datos.
const ProveedorDelete = (req, res = response) => {

    const { IdProveedor } = req.body;

    if (!IdProveedor) {

        return res.json({
            ok: false,
            message: 'NO HAS ESPECIFICADO EL PROVEEDOR A SER ELIMINADO.'
        });
    }

    const DELETE = `DELETE FROM proveedor WHERE IdProveedor = ${IdProveedor}`;

    pool.query(DELETE, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL ELIMINAR PROVEEDOR.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL PROVEEDOR NO HA SIDO ELIMINADO.'
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