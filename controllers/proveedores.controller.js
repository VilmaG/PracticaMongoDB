const Proveedor = require('../models/proveedor.model');

const getProveedores=async(req,res)=>{
    
    const proveedores = await Proveedor.find({}, '');
    res.json({
        ok: true,
        proveedores
    })
}
const crearProveedor = async(req, res)=>{
    //console.log(req.body);
    const {codigo,nombre,direccion,celular}=req.body;

    try {
        const existeCodigo = await Proveedor.findOne({codigo});
        if(existeCodigo){
            return res.status(400).json({
                ok:false,
                msg: 'El codigo ya ha sido registrado'
            });
        }   
    const proveedor = new Proveedor(req.body);
    //indicamos a mongoose que registre el proveedor en la bd
    await proveedor.save();
    res.json({
        ok: true,
        proveedor
    });
} catch (error){
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error en el servidor, revisar logs'
    });
}
}

const actualizarProveedor = async (req, res= response)=>{
    const uid = req.params.id;
    try {
        const proveedorDB = await Proveedor.findById(uid);
    
        if (!proveedorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }
    //Codigo previo a la actualizacion
    const {codigo,nombre, ...campos} = req.body;
    if(proveedorDB.nombre !== nombre){
        const existeNombre = await Proveedor.findOne({nombre});
        if (existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un proveedor con este nombre'
            });
        }
    }
    campos.nombre = nombre;
    
    //actualizacion de datos
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(uid, campos, {new:true});
    res.json({
        ok:true,
        proveedor:proveedorActualizado
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al actualizar categoria'
    });
}
}

const eliminarProveedor = async(req, res=response) =>{
    const uid = req.params.id;
    try {
    const proveedorDB = await Proveedor.findById(uid);
    if(!proveedorDB){
        return res.status(404).json({
        ok: false,
        msg: 'No existe un proveedor con ese id'
    });
    }
    await Proveedor.findByIdAndDelete(uid);
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
    getProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
}