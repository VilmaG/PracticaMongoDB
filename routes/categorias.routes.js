//Ruta API

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria} = require('../controllers/categorias.controller');
//const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/', getCategorias)
router.post('/',
[
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos, 
],
crearCategoria);
    
router.put('/:id',
    [
        
        //check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        
        validarCampos,
    ],
actualizarCategoria);

router.delete('/:id', eliminarCategoria);

module.exports = router;