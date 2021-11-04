const { Router } = require('express');

const crearTablasPost = require('../database/tablas');

const router = Router();

router.post('/', crearTablasPost);


module.exports = router;