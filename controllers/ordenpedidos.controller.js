const { response } = require('express');
const Ordenpedido = require('../models/ordenpedido.model');

const getOrdenpedidos = async(req,res = response)=>{
    
    const Ordenpedidos = await Ordenpedido.find().populate('cliente').populate('empleado')
    res.json({
        ok: true,
        Ordenpedidos:Ordenpedidos
    })
}

const crearOrdenpedido = async(req, res = response)=>{
    //console.log(req.body);
    const uid = req.uid;
    const ordenpedido = new Ordenpedido({cliente: uid, ...req.body})
    try {
         const ordenpedidoDB = await ordenpedido.save();

        res.json({
            ok: true,
            ordenpedido:ordenpedidoDB
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado, consulte con el administrador'
    });
}
}

const actualizarOrdenpedido = async (req, res= response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const ordenpedido = await Ordenpedido.findById(id);
    
        if (!ordenpedido){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una orden con ese id'
            });
        }
        const cambiosOrdenpedido = {...req.body,cliente: uid
        }

        const OrdenpedidoActualizado = await Ordenpedido.findByIdAndUpdate( id, cambiosOrdenpedido, { new: true } );


        res.json({
            ok: true,
            ordenpedido: OrdenpedidoActualizado
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar orden'
    });
}
}

const eliminarOrdenPedido = async(req, res=response) =>{
    const id = req.params.id;
    try {
    const ordenpedido = await Ordenpedido.findById(id);
    if(!Ordenpedido){
        return res.status(404).json({
        ok: true,
        msg: 'No existe una orden con ese id'
    });
    }
    await Ordenpedido.findByIdAndDelete(id);
        res.json({
        ok:true,
        msg: 'Orden eliminada de la bd'
    });
    } catch (error) {
        console.log(error);

        res.status(500).json({
        ok:false,
        msg: 'No es posible eliminar Orden'
        });
    }
}


module.exports = {
    getOrdenpedidos,
    crearOrdenpedido,
    actualizarOrdenpedido,
    eliminarOrdenPedido,
}