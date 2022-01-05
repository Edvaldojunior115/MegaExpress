const { Router } = require('express');

const {
    LoginUser,
    CrearLogin

} = require('../controllers/login');

const router = Router();

router.post('/', LoginUser);

router.post('/CrearLogin', CrearLogin);




module.exports = router;