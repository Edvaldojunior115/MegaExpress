const { response, request } = require('express');
const pool = require('../database/data');


const LoginUser = (req, res = response) => {

    const { Legajo, contrasena } = req.body;

    console.log(Legajo, contrasena);

    const SELECT = `SELECT * FROM login WHERE Legajo = '${Legajo}' AND Contrasena = ${contrasena}`;

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
                message: 'EL USUARIO ESPECÍFICADO NO SE ENCUENTRA REGISTRADO.'
            });
        }

        return res.json({

            ok: 'true',
            message: 'El usuario se encuentra Registrado.',
            datos: result

        });

    });

}


module.exports = {
    LoginUser
}