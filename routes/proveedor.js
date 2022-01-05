const { Router } = require('express');

const {
    ProveedorGet,
    ProveedoresGet,
    ProveedorPost,
    ProveedorPut,
    ProveedorDelete
} = require('../controllers/proveedor');

const router = Router();

//AGREGAR UN PROVEEDOR
router.post('/', ProveedorPost);

//NOS DEVUELVE TODOS LOS PROVEEDORES
router.get('/', ProveedoresGet);

//DEVUELVE UN SOLO PROVEEDOR A TRAVÉS DEL ID.
router.get('/Proveedor', ProveedorGet);

//SE ACTUALIZA UN PROVEEDOR
router.put('/', ProveedorPut);

//SE ELIMINA UN PROVEEDOR A TRAVÉS DE UN PARAMETROS PASADO QUE IDENTIFIQUE ESE COMO TAL.
router.delete('/', ProveedorDelete);


module.exports = router;