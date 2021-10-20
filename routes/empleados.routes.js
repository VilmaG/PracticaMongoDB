/*
    Ruta: /api/empleados
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado } = require('../controllers/empleados.controller');
const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getEmpleados);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ] ,
    crearEmpleado);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,   
    ] ,
    actualizarEmpleado);

router.delete('/:id',validarJWT, eliminarEmpleado);


module.exports = router;