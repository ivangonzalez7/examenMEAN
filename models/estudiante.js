/**
 * Created by raul on 5/4/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;


var telefonos = new Schema ({
    casa: {
        type:String
    },
    trabajo: { 
        type: String
    }

})

var estudianteSchema = new Schema({
    nombre:  {
        type : String
    },
    // apellidos: {
    //     primero: String,
    //     segundo: String
    // },
    direccion : {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    telefonos:[telefonos]
});

module.exports = mongoose.model('Estudiante', estudianteSchema);