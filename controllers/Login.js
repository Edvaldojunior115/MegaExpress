const { response } = require('express');
const pool = require('../database/data');


const LoginUser = (req, res = response) => {

    const { Legajo, Contrasena } = req.body;

    if (Legajo == undefined || Legajo == '' && Contrasena == undefined || Contrasena == '') {

        return res.json({
            ok: 'false',
            message: 'USUARIO O CONTRASEÑA SON INCORRECTOS. POR FAVOR, INTENTE NUEVAMENTE.'

        });

    }


    const SELECT = `SELECT * FROM login WHERE legajo = ${Legajo} AND contrasena = ${Contrasena}`;

    pool.query(SELECT, (err, result) => {

        if (err) {

            return res.json({

                ok: false,
                message: 'ERROR AL INTENTAR LOGUEARSE',
                err
            });
        }

        if (result.length == 0) {

            return res.json({
                ok: false,
                message: 'USUARIO O CONTRASEÑA SON INCORRECTOS'
            });
        }

        return res.json({

            ok: true,
            acceso: 1,
            message: 'BIENVENIDO, LOGIN REALIZADO CON ÉXITO.',
            datos: result

        });

    });

}

//Método para crear un login en la base de datos.
const CrearLogin = (req, res = response) => {

    const { Legajo, Contrasena, Email, Rol } = req.body;

    if (Legajo == undefined || Legajo == '' && Contrasena == undefined || Contrasena == '') {

        return res.json({
            ok: 'false',
            message: 'LEGAJO Y CONTRASENA SON OBLIGATORIOS PARA EL REGISTRO DEL LOGIN.'

        });
    }

    const INSERT = `INSERT INTO login (id, legajo, contrasena, email, rol)
    VALUES (NULL, "${Legajo}", "${Contrasena}", "${Email}", "${Rol}");`;

    pool.query(INSERT, (err, result) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'ERROR AL INTENTAR REGISTRARSE, POR FAVOR INTENTE NUEVAMENTE.',
                err
            });
        }

        if (result.length == 0) {
            return res.json({
                ok: false,
                message: 'EL USUARIO NO HA SIDO AGREGADO.'
            });
        }

        res.json({
            ok: true,
            message: 'EL USUARIO HA SIDO AGREGADO CON ÉXITO.',
            idInsertado: result.insertId
        });
    });

}


module.exports = {
    LoginUser,
    CrearLogin
}