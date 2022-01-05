const { Router } = require('express');

const {

    RubroGet,
    RubrosGet,
    RubroPost,
    RubroPut,
    RubroDelete

} = require('../controllers/rubro');

const router = Router();

//CONSULTAMOS TODOS LOS RUBROS REGISTRADOS
router.get('/rubros', RubrosGet);

//CONSULTAMOS UN RUBRO A TRAVÉS DEL CÓDIGO PASADO POR PARÁMETRO DEL RUBRO
router.get('/', RubroGet);

//CREAMOS UN NUEVO RUBRO
router.post('/', RubroPost);

//ACTUALIZAMOS UN RUBRO A TRAVÉS DEL CÓDIGO PASADO POR PARÁMETRO DEL RUBRO
router.put('/', RubroPut);

//ELIMINAMOS UN RUBRO A TRAVÉS DEL CÓDIGO PASADO POR PARÁMETRO DEL RUBRO
router.delete('/', RubroDelete);


module.exports = router;