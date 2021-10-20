const { response } = require("express");
const bcrypt = require('bcryptjs');

const Empleado = require ('../models/empleado.model');
const { generarJWT } =  require('../helpers/jwt')


const login = async(req, res= response)=> {
    const { email, password } = req.body;

    try {
        
        // Verificar al usuario por su email
        const empleadoDB = await Empleado.findOne({ email });

        if ( !empleadoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
                
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, empleadoDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( empleadoDB.id );

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}