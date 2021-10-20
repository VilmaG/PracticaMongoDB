const { Schema, model } = require('mongoose');

const OrdenPedidoSchema = Schema({
    num: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        
    },
    total:{
        type: Number,
        required: true
    },
},{collection: 'OrdenPedidos'});


OrdenPedidoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'OrdenPedido', OrdenPedidoSchema );