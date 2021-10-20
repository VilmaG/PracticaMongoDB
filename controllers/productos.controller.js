const { response } = require('express');
const Producto = require('../models/producto.model');

const getProductos = async(req,res = response)=>{
    
    const productos = await Producto.find().populate('categoria').populate('proveedor')
    res.json({
        ok: true,
        productos:productos
    })
}

const crearProducto = async(req, res = response)=>{
    //console.log(req.body);
    const uid = req.uid;
    const producto = new Producto({categoria: uid, ...req.body})
    try {
         const productoDB = await producto.save();

        res.json({
            ok: true,
            producto:productoDB
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado, consulte con el administrador'
    });
}
}

const actualizarProducto = async (req, res= response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const producto = await Producto.findById(id);
    
        if (!producto){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }
        const cambiosProducto = {...req.body,proveedor: uid
        }

        const ProductoActualizado = await Producto.findByIdAndUpdate( id, cambiosProducto, { new: true } );


        res.json({
            ok: true,
            investigador: ProductoActualizado
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar Producto'
    });
}
}

const eliminarProducto = async(req, res=response) =>{
    const id = req.params.id;
    try {
    const producto = await Producto.findById(id);
    if(!Producto){
        return res.status(404).json({
        ok: true,
        msg: 'No existe un producto con ese id'
    });
    }
    await Producto.findByIdAndDelete(id);
        res.json({
        ok:true,
        msg: 'Producto eliminado de la bd'
    });
    } catch (error) {
        console.log(error);

        res.status(500).json({
        ok:false,
        msg: 'No es posible eliminar Producto'
        });
    }
}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
}