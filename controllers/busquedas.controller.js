const { response } = require("express")

const Categoria = require('../models/categoria.model');
const Producto = require('../models/producto.model');
const Proveedor = require('../models/proveedor.model');



const busquedaTotal = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [categoria, producto, proveedor] = await Promise.all ([
        Categoria.find({nombre:miRegExp}), // la busqueda es por nombre
        Producto.find({nombre:miRegExp}),
        Proveedor.find({nombre:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        producto,
        categoria,
        proveedor
    });

}

//estructura de la peticion 
const busquedaColeccion = async (req, res=response)=>{

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'categorias':
            data = await Categoria.find({nombre:miRegExp})
                            
            break;   
        case 'productos':
            data = await proveedor.find({nombre:miRegExp})
                    .populate('categorias')
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser categorias/proveedores/productos"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
    
}

module.exports ={
    busquedaTotal,
    busquedaColeccion
}