const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    codigo:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        
    },
    direccion:{
        type: String,
    },
    cargo:{
        type: String
    },
    edad:{
        type:Number
    },
    celular:{
        type: Number
    },
    email:{
        type:String
    },
    password:{
        type: String
    },  
},{ collection: 'Empleados'});


EmpleadoSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Empleado', EmpleadoSchema );