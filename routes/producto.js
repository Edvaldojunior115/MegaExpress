const { Router } = require('express');

const {
    ProductoGet,
    ProductosGet,
    ProductoPut,
    AgregarProducto,
    ProductoDelete
} = require('../controllers/producto');

const router = Router();

//AGREGAR UN PRODUCTO
router.post('/', AgregarProducto);

//NOS DEVUELVE TODOS LOS PRODUCTOS
router.get('/', ProductosGet);

//DEVUELVE UN SOLO PRODUCTO A TRAVÉS DEL código.
router.get('/producto', ProductoGet);

//SE ACTUALIZA UN PRODUCTO PASANDO POR PARAMETROS EL ID DEL PRODUCTO
router.put('/', ProductoPut);

//SE ELIMINA UN PRODUCTO A TRAVÉS DE UN PARAMETROS PASADO QUE IDENTIFIQUE ESE COMO TAL.
router.delete('/', ProductoDelete);


module.exports = router;