module.exports = function (app) {

    var mongoose = require('mongoose');
    var Asignatura = require('../models/asignatura.js');
    var Estudiante = require('../models/estudiante.js');




    //GET - Obtener todos los asignaturas de la colección de asignaturas de la BBDD
    ObtenerAsignaturas = function(req, res){
    	console.log("GET asignaturas / populate");
        Asignatura.find({}, function(err, estudiantes) {
            console.log(estudiantes);
            Estudiante.populate(estudiantes, {path: "estudiantes"},function(err, estudiantes){
            res.status(200).send(estudiantes);
            console.log(estudiantes);
            }); 
         });
    };

    //GET - Obtener todos los asignaturas de la colecccion asignaturas de la BBDD
    // ObtenerAsignaturasPopulate = function (req, res) {
    //     Asignatura.find({}, function(err, asignaturas) {
    //         Estudiante.populate(asignaturas, {path: "estudiante"},function(err, asignaturas){
    //             res.status(200).send(asignaturas);
    //         }); 
    //     });
    // };

    ObtenerAsignaturasPopulate = function(req, res) {  
        Asignatura.find({}, function(err, asignaturas) {
            Estudiante.populate(asignaturas, {path: "estudiante"},function(err, asignaturas){
                res.status(200).send(asignaturas);
            }); 
        });
    };

    //POST - añadir un asignatura a la colección asignaturas en la BBDD
    CrearAsignatura = function(req, res, next){
    	var asignatura = new Asignatura({
            nombre: req.body.nombre,
            asignatura: []

        })

        asignatura.save(function (err, asignatura) {

        console.log('POST asignatura');
        console.log(asignatura.nombre);
        console.log(asignatura.asignatura);
        console.log('88888');
            if (err) return res.send(500, err.message);
            res.status(200).json(asignatura);
        });
    };

    //POST - Añadir una asignatura a la colección asignaturas de la BBDD con condición asignatura repetida
    // CrearAsignaturaCondicion = function(req, res){
    // 	var nombre = req.body.nombre;
    // 	//Comprobamos condiciones de duplicación
    // 	Asignatura.find({nombre:nombre}, function(err, asignatura){
    // 		if(asignatura == ""){
	   //  		console.log('Asignatura no duplicada, OK');
	   //  		var asignatura = new Asignatura(req.body);
	   //  		asignatura.save(function(err, asignatura){
	   //  			if(err) return res.send(500, err.message);
	   //  			console.log('POST Asignatura condicion ' + req.body.nombre);
	   //  			res.status(200).jsonp(asignatura);
	   //  		});
    // 		}else{
    // 			console.log('Asignatura ya existente');
    // 			return res.status(409).jsonp("La asignatura " + nombre + " ya existe en la base de datos.")
    // 		}
    // 	});
    // };

    //GET - Obtner asignatura a partir de el ID
    ObtenerAsignaturaPorID = function (req, res) {
        Asignatura.findById(req.params.id, function (err, asignatura) {
            if(err) return res.send(500, err.message);

            console.log('GET Asignatura id: ' + req.params.id + ' nombre ' + req.params.nombre);
            res.status(200).jsonp(asignatura);
        });
    };

    ObtenerAsignaturaPorNombre = function (req, res) {
        console.log (req.params.nombre);
        Asignatura.find({nombre: req.params.nombre}, function (err, estudiantes) {
            Estudiante.populate(estudiantes, {path: "estudiantes"}, function (err, estudiantes) {
                res.status(200).send(estudiantes);
                console.log(estudiantes);
            });
        });
    };

    addEstudianteAsignatura = function (req, res) {

        console.log('PUT asignatura con un estudiante');
        console.log(req.params.nombre);
        console.log(req.params.nombre_estudiante);
        console.log('77777');
        Estudiante.findOne({nombre: req.params.nombre_estudiante},function(err,estudiante){
            if(err) return err.message("ERROR");
            else {
                console.log(estudiante);
                console.log(estudiante.nombre);
                console.log(estudiante._id);

                Asignatura.findOneAndUpdate({nombre: req.params.nombre}, {$push: {estudiantes: estudiante._id}}, function (err, result) {
                    console.log(result);
                    res.send(result);
                });
            }
        });
    };

    //PUT Modificar datos de un asignatura existente por ID
    ModificarAsignatura = function (req, res) {
        console.log('PUT Asignatura ' + req.body.nombre);
        Asignatura.findById(req.params.id, function (err, asignatura) {

            asignatura.nombre = req.body.nombre,
            asignatura.estudiantes = req.body.estudiantes

            asignatura.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(asignatura);
            });
        });
    };

    //DELETE - Eliminar usuario v2
    EliminarAsignaturaPorID = function(req, res){
      console.log('DELETE Asignatura ' + req.params.id);
      Asignatura.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
        res.json({message: 'Asignatura eliminada correctamente'});
      })
    };

    //GET Obtener todos los usuarios de la colecccion usuarios paginado
    ObtenerAsignaturasP = function (req, res){
        console.log('post /obtenerAsignaturasP');

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

        Asignatura
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, asignaturas) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(asignaturas);
                }
        });

    };

    // //GET - Estudiantes de una asignatura
    // EstudiantesAsignatura = function(req, res){
    //     console.log(req.body);
    //     Estudiante.find
    // }

    // //GET - Return a Requests with specified iduser
    // findByIdRequest = function (req, res) {
    //     console.log(req.body);
    //     Request.find({request:req.params.id}, function (err, request) {
    //         if (err) return res.send(500, err.message);

    //         console.log('GET /request/' + req.params.id);
    //         res.status(200).jsonp(request);
    //     });
    // };

    // //PUT Añadir usuario invitado a una partida creada ID
    // UnirsePartidaporID = function (req, res) {
    //     console.log('Put/UnirsePartida')
    //     Partida.findById(req.params.id, function (err, partida) {

    //         console.log(req.body);

    //         partida.IDinvitado  =  req.body.IDinvitado;

    //         partida.save(function (err) {
    //             if (err) return res.send(500, err.message);
    //             res.status(200).jsonp(partida);
    //         });
    //     });
    // };

    //ENDPOINTS
    app.post(   '/asignatura/asignatura', CrearAsignatura);
    // app.post(   '/asignatura/asignaturac', CrearAsignaturaCondicion);
    app.get(    '/asignatura/asignaturas', ObtenerAsignaturas);
    app.get(    '/asignatura/asignaturaspop', ObtenerAsignaturasPopulate);
    app.get(    '/asignatura/asignaturasp', ObtenerAsignaturasP);
    app.get(    '/asignatura/asignatura/:id', ObtenerAsignaturaPorID);
    app.put(    '/asignatura/asignatura/:id', ModificarAsignatura);
    app.put(    '/addEstudianteAsignatura/:nombre/:nombre_estudiante',addEstudianteAsignatura);
    app.delete( '/asignatura/asignatura/:id', EliminarAsignaturaPorID);
}