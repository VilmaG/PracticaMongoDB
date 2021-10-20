const {response} = require('express');
const Categoria = require('../models/categoria.model');

const getCategorias=async(req,res)=>{
    
    const categorias = await Categoria.find({}, '');
    res.json({
        ok: true,
        categorias
    })
}

const crearCategoria = async(req, res=response)=>{
    //console.log(req.body);
    const {codigo,nombre}=req.body;

    try {
        const existeCodigo = await Categoria.findOne({codigo});
        if(existeCodigo){
            return res.status(400).json({
                ok:false,
                msg: 'El codigo ya ha sido registrado'
            });
        }   

    //creamos un objeto de la clase model categoria
    const categoria = new Categoria(req.body);

    //indicamos a mongoose que registre la categoria e la bd
    await categoria.save();
    res.json({
        ok: true,
        categoria
    });
} catch (error){
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error en el servidor, revisar logs'
    });
}
}

const actualizarCategoria = async (req, res= response)=>{
    const uid = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(uid);
    
        if (!categoriaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }
    //Codigo previo a la actualizacion
    const {codigo,nombre, ...campos} = req.body;
    if(categoriaDB.nombre !== nombre){
        const existeNombre = await Categoria.findOne({nombre});
        if (existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con este nombre'
            });
        }
    }
    campos.nombre = nombre;
    
    //actualizacion de datos
    const categoriaActualizada = await Categoria.findByIdAndUpdate(uid, campos, {new:true});
    res.json({
        ok:true,
        categoria: categoriaActualizada
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al actualizar categoria'
    });
}
}

const eliminarCategoria = async(req, res=response) =>{
    const uid = req.params.id;
    try {
    const categoriaDB = await Categoria.findById(uid);
    if(!categoriaDB){
        return res.status(404).json({
        ok: false,
        msg: 'No existe una categoria con ese id'
    });
    }
    await Categoria.findByIdAndDelete(uid);
        res.json({
        ok:true,
        msg: 'Categoria eliminada de la bd'
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok:false,
        msg: 'No es posible eliminar Categoria'
        });
    }
}


module.exports = {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
}