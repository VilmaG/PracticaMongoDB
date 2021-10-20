const { response } = require('express');
const Cliente = require('../models/cliente.model');

const getClientes=async(req,res)=>{
    
    const clientes = await Cliente.find({}, '');
    res.json({
        ok: true,
        clientes
    })
}

const crearCliente = async(req, res=response)=>{
    //console.log(req.body);
    const {codigo,nombre,direccion,celular}=req.body;

    try {
        const existeCodigo = await Cliente.findOne({codigo});
        if(existeCodigo){
            return res.status(400).json({
                ok:false,
                msg: 'El codigo ya ha sido registrado'
            });
        }   

    //creamos un objeto de la clase model categoria
    const cliente = new Cliente(req.body);

    //indicamos a mongoose que registre la categoria e la bd
    await cliente.save();
    res.json({
        ok: true,
        cliente
    });
} catch (error){
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error en el servidor, revisar logs'
    });
}
}

const actualizarCliente = async (req, res= response)=>{
    const uid = req.params.id;
    try {
        const clienteDB = await Cliente.findById(uid);
    
        if (!clienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }
    //Codigo previo a la actualizacion
    const {codigo,nombre, ...campos} = req.body;
    if(clienteDB.codigo !== codigo){
        const existeCodigo = await Cliente.findOne({codigo});
        if (existeCodigo){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un ciente con este codigo'
            });
        }
    }
    campos.codigo = codigo;
    
    //actualizacion de datos
    const clienteActualizado = await Cliente.findByIdAndUpdate(uid, campos, {new:true});
    res.json({
        ok:true,
        cliente:clienteActualizado
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al actualizar cliente'
    });
}
}

const eliminarCliente = async(req, res=response) =>{
    const uid = req.params.id;
    try {
    const clienteDB = await Cliente.findById(uid);
    if(!clienteDB){
        return res.status(404).json({
        ok: false,
        msg: 'No existe un cliente con ese id'
    });
    }
    await Cliente.findByIdAndDelete(uid);
        res.json({
        ok:true,
        msg: 'Proveedor eliminado de la bd'
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok:false,
        msg: 'No es posible eliminar proveedor'
        });
    }
}


module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
}