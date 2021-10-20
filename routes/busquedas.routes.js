const { Router } = require('express');
const { busquedaTotal, busquedaColeccion } = require('../controllers/busquedas.controller');
//const { validarJWT } = require ('../middlewares/validar-jwt');


const router = Router();

router.get( '/:busqueda',busquedaTotal );
router.get( '/coleccion/:micoleccion/:busqueda' ,busquedaColeccion );


module.exports = router;