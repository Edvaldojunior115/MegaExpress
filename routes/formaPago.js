const { Router } = require('express');

const {
    FormaPagoGet,
    FormaPagosGet,
    FormaPagoPost,
    FormaPagoPut,
    FormaPagoDelete

} = require('../controllers/formaPago');


const router = Router();

router.get('/', FormaPagosGet);

router.get('/FormaPago', FormaPagoGet);

router.post('/', FormaPagoPost);

router.put('/', FormaPagoPut);

router.delete('/', FormaPagoDelete);





module.exports = router;