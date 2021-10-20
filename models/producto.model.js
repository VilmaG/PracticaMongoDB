const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    codigo:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        
    },
    precioVenta:{
        type:Number,
        required: true
    },
    precioCompra:{
        type: Number,
        required: true
    },
    fechaVencimiento:{
        type: Date,
        
    },
    stock:{
        type: Number

    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
    },
    
},{ collection: 'Productos'});


ProductoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Producto', ProductoSchema );