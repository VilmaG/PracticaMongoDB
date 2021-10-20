const {Schema, model} = require('mongoose');

//Definicion del esquema para la coleccion de Clientes

const ClienteSchema = Schema({
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
    Sexo:{
        type: String
    },
    dni:{
        type: Number,
        required: true
    },
    celular:{
        type:Number
    },
    
},{ collection: 'Clientes'});
//se utiliza collection para indicar el nombre como queremos que se cree 
//la coleccion en la base de datos

//Este cambio es solo para fines visuales, la bd permanece con _id
ClienteSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo

module.exports = model ('Cliente', ClienteSchema);
