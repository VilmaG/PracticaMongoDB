//Ruta API

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { getClientes, crearCliente, actualizarCliente, eliminarCliente} = require('../controllers/clientes.controller');
//const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/', getClientes)
router.post('/',
[
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos, 
],
crearCliente);
    
router.put('/:id',
    [
       
        //check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        
        validarCampos,
    ],
actualizarCliente);

router.delete('/:id',eliminarCliente);

module.exports = router;