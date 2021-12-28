const { Router } = require('express');

const {
    LoginUser,
    CrearLogin

} = require('../controllers/login');

const router = Router();

router.get('/', LoginUser);
router.post('/', CrearLogin);






module.exports = router;