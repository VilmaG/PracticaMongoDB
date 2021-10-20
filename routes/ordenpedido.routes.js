//Ruta API

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getOrdenpedidos, crearOrdenpedido, actualizarOrdenpedido, eliminarOrdenPedido} = require('../controllers/ordenpedidos.controller');
//const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/', getOrdenpedidos)
router.post('/',
[
    check('num','El número de pedido es obligatorio').not().isEmpty(),
    validarCampos, 
],
crearOrdenpedido);
    
router.put('/:id',
    [
       
        check('num','El número de pedido es obligatorio').not().isEmpty(),
        
        validarCampos,
    ],
actualizarOrdenpedido);

router.delete('/:id',eliminarOrdenPedido);

module.exports = router;