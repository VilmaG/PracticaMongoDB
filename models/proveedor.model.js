const {Schema, model} = require('mongoose');

//Definicion del esquema para la coleccion de Clientes

const ProveedorSchema = Schema({
    codigo:{
        type:String,
        required:true
    },
    nombre:{
        type: String,
        required: true
    },
    direccion:{
        type: String
    },
    celular:{
        type:Number
        
    },
      
},{ collection: 'Proveedores'});

ProveedorSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Proveedor', ProveedorSchema);