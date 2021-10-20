const { Schema, model } = require('mongoose');

const DetalleOrdenPedidoSchema = Schema({
    ordenpedido: {
        type: Schema.Types.ObjectId,
        ref: 'OrdenPedido',
        required: true
    },
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad:{
        type: Number
    },
    precioVenta:{
        type: Number,
        required: true
    },
    importe:{
        type: Number
    }
},{collection: 'DetalleOrdenPedidos'});


DetalleOrdenPedidoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'DetalleOrdenPedido', DetalleOrdenPedidoSchema );