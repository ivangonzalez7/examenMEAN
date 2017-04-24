module.exports = function (app) {

    var mongoose = require('mongoose');
    var Estudiante = require('../models/estudiante.js');
    var Asignatura = require('../models/asignatura.js');




    //GET - Obtener todos los estudiantes de la colección de estudiantes de la BBDD
    ObtenerEstudiantes = function(req, res){
    	console.log("GET - Estudiantes /populate");
        Estudiante.find({}, function(err, estudiante) {
            Estudiante.populate(estudiante, {path: "estudiante"},function(err, estudiante){
            res.status(200).send(estudiante);
            }); 
         });
    };

    //POST - añadir un estudiante a la colección estudiantes en la BBDD
    CrearEstudiante = function(req, res, next){
    	var telefonos = new Estudiante ({
            casa:req.body.casa,
            trabajo:req.body.trabajo

       })
        var estudiante = new Estudiante({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefonos:req.body.telefonos
        })

        estudiante.save(function (err, estudiante) {
            if (err) return res.send(500, err.message);
            res.status(200).json(estudiante);
        });
    };

    //POST - Añadir un estudiante a la colección estudiantes de la BBDD con condición alumno repetido
    // CrearEstudianteCondicion = function(req, res){
    // 	var nombre = req.body.nombre;
    // 	//Comprobamos condiciones de duplicación
    // 	Estudiante.find({nombre:nombre}, function(err, estudiante){
    // 		if(estudiante == ""){
	   //  		console.log('Estudiante no duplicado, OK');
	   //  		var estudiante = new Estudiante(req.body);
	   //  		estudiante.save(function(err, estudiante){
	   //  			if(err) return res.send(500, err.message);
	   //  			console.log('POST Estudiante condicion ' + req.body.nombre);
	   //  			res.status(200).jsonp(estudiante);
	   //  		});
    // 		}else{
    // 			console.log('Estudiante ya existente');
    // 			return res.status(409).jsonp("El estudiante " + nombre + " ya existe en la base de datos.")
    // 		}
    // 	});
    // };

    //GET- GET todos los estudiantes por su nombre
    ObtenerEstudiantePorNombre = function (req, res) {
        console.log (req.params.nombre);
        Estudiante.find({nombre: req.params.nombre}, function (err, estudiante) {
            Estudiante.populate(estudiante, {path: "estudiante"}, function (err, estudiante) {
                res.status(200).send(estudiante);
                console.log(estudiante);
            });
        });
    };

    //GET - Obtner estudiante a partir de el ID
    ObtenerEstudiantePorID = function (req, res) {
        Estudiante.findById(req.params.id, function (err, estudiante) {
            if(err) return res.send(500, err.message);

            console.log('GET Estudiante id: ' + req.params.id + ' nombre ' + req.params.nombre);
            res.status(200).jsonp(estudiante);
        });
    };

    //PUT Modificar datos de un estudiante existente por ID
    ModificarEstudiante = function (req, res) {
        console.log('PUT Estudiante ' + req.body.nombre);
        Estudiante.findById(req.params.id, function (err, estudiante) {

            estudiante.nombre = req.body.nombre,
            estudiante.direccion = req.body.direccion,
            // estudiante.telefonos = req.body.telefonos[0].casa,
            // estudiante.telefonos = req.body.telefonos[1].trabajo

            estudiante.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(estudiante);
            });
        });
    };

    //DELETE - Eliminar usuario v2
    EliminarEstudiantePorID = function(req, res){
      console.log('DELETE Estudiante ' + req.params.id);
      Estudiante.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
        res.json({message: 'Estudiante eliminado correctamente'});
      })
    };

    //GET Obtener todos los usuarios de la colecccion usuarios paginado
    ObtenerEstudiantesP = function (req, res){
        console.log('post /obtenerEstudiantesP');

        var sort;
        var sortObject = {};
        var count  = req.query.count || 5;
        var page   = req.query.page || 1;

        var filter = {
            filters : {
                mandatory : {
                    contains: req.query.filter
                }
            }
        };
        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        if (req.query.sorting) {
            var sortKey = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject.desc = '_id';
        }

        sort = {
            sort: sortObject
        };

        Estudiante
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, estudiantes) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(estudiantes);
                }
        });

    };

    //ENDPOINTS
    app.post(   '/estudiante/estudiante', CrearEstudiante);
    // app.post(   '/estudiante/estudiantec', CrearEstudianteCondicion);
    app.get(    '/estudiante/estudiantes', ObtenerEstudiantes);
    app.get(    '/estudiante/estudiantes', ObtenerEstudiantePorNombre);
    app.get(    '/estudiante/estudiantep', ObtenerEstudiantesP);
    app.get(    '/estudiante/estudiante/:id', ObtenerEstudiantePorID);
    app.put(    '/estudiante/estudiante/:id', ModificarEstudiante);
    app.delete( '/estudiante/estudiante/:id', EliminarEstudiantePorID);
}