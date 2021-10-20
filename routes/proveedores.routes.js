//Ruta API

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getProveedores, crearProveedor, actualizarProveedor, eliminarProveedor} = require('../controllers/proveedores.controller');

const router = Router();

router.get('/', getProveedores)
router.post('/',
[
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos, 
],
crearProveedor);
    
router.put('/:id',
    [      
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        
        validarCampos,
    ],
actualizarProveedor);

router.delete('/:id',eliminarProveedor);

module.exports = router;