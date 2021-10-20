const { response } = require('express');
const bcrypt = require('bcryptjs');
const Empleado = require('../models/empleado.model');


const getEmpleados = async (req, res)=>{

    const empleados = await Empleado.find({}, '');
    
    res.json({
        ok: true,
        empleados
    });
    
}

const crearEmpleado = async(req, res=response)=>{

    //console.log(req.body);
    const {email,password,nombre} = req.body;

    try {

        const existeEmail = await Empleado.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Empleado
        const empleado = new Empleado(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        empleado.password = bcrypt.hashSync(password, salt);

        //indicamos a mongoose que registre al empleado en la bd
        await empleado.save();

        
        res.json({
            ok:true,
            empleado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 

const actualizarEmpleado = async (req, res= response)=>{
    const uid = req.params.id;
        
    try {
        const empleadoDB = await Empleado.findById(uid);

        if (!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {password, email, ...campos} = req.body;
        if(empleadoDB.email !== email){
            const existeEmail = await Empleado.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un empleado con este email'
                });
            }
        }
        campos.email = email;
               
        //actualizacion de datos
        const empleadoActualizado = await Empleado.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            empleado: empleadoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar datos'
        });
    }
}

const eliminarEmpleado = async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const empleadoDB = await Empleado.findById(uid);
        if(!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        await Empleado.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Empleado eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar empleado'
        });
    }
}


module.exports = {
    getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
}