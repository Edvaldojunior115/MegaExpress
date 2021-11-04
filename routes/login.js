const { Router } = require('express');

const {
    LoginUser
} = require('../controllers/login');

const router = Router();


router.post('/', LoginUser);




module.exports = router;