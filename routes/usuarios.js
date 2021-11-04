const { Router } = require('express');

const {
    ClientesGet,
    ClienteGet,
    ClientePost,
    ClientePut,
    ClienteDelete
} = require('../controllers/usuarios');

const router = Router();

router.post('/', ClientePost);

router.get('/', ClientesGet);

// El método anterior para traer cliente a diferencia del de abajo, es que uno trae todos los clientes
// Y el otro solamente un cliente específico. 
router.get('/cliente', ClienteGet);

router.put('/', ClientePut);

router.delete('/', ClienteDelete);


module.exports = router;