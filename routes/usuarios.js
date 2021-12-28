const { Router } = require('express');

const {
    ClientesGet,
    ClienteGet,
    ClientePost,
    ClientePut,
    ClienteDelete,
    ActivarCliente
} = require('../controllers/usuarios');

const router = Router();

router.post('/', ClientePost);

//NOS DEVUELVE TODOS LOS CLIENTES
router.get('/', ClientesGet);

//DEVUELVE UN SOLO CLIENTE A TRAVÉS DEL DNI.
router.get('/cliente', ClienteGet);

//SE ACTUALIZA UN CLIENTE
router.put('/', ClientePut);

//SE ELIMINA UN CLIENTE A TRAVÉS DE UN PARAMETROS PASADO QUE IDENTIFIQUE ESE COMO TAL.
router.delete('/', ClienteDelete);

//Reactivamos un cliente ELIMINADO LÓGICAMENTE.
router.put('/ActivarCliente', ActivarCliente);


module.exports = router;