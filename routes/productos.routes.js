
//Ruta API

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto} = require('../controllers/productos.controller');
//const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/', getProductos)
router.post('/',
[
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos, 
],
crearProducto);
    
router.put('/:id',
    [
       
        //check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        
        validarCampos,
    ],
actualizarProducto);

router.delete('/:id',eliminarProducto);

module.exports = router;