const {Schema, model} = require('mongoose');
//Definicion del esquema para la coleccion de Categoria
const CategoriaSchema = Schema({
    codigo:{
        type: String,
        required: true
        },
    nombre:{
        type: String,
        required: true,
    },    
    
},{ collection: 'Categorias'});

CategoriaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural
module.exports = model ('Categoria', CategoriaSchema);