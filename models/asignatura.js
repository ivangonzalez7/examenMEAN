/**
 * Created by raul on 5/4/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;
var Estudiante = mongoose.model('Estudiante');

var asignaturaSchema = new Schema({

    nombre: { 
    	type: String 
    },
    estudiantes:
        [{
            type: Schema.ObjectId,
            ref: "Estudiante"
        }],
    created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Asignatura', asignaturaSchema);