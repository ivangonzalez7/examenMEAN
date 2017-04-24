
    eaApp.factory('comun2', function($http) {

        
        var comun2 = {};

        comun2.estudiantes = [];

        comun2.estudiante = {};

        /***Sección de métodos remotos***/
        comun2.getAll = function(){
            return $http.get('/estudiante/estudiantes')
            .success(function(data){

                angular.copy(data, comun2.estudiantes)

                return comun2.estudiantes
            })
        }

        comun2.add = function(estudiante){
            return $http.post('/estudiante/estudiante', estudiante)
            .success(function(estudiante){
                comun2.estudiantes.push(estudiante);
                swal({
                  title: "Estudiante Creado",
                  text: "El estudiante " + estudiante.nombre + " se ha creado correctamente",
                  imageUrl: 'images/ok.png'
                });
            })
            .error(function(error){
                swal({
                  title: "Error",
                  text: "Error al crear el estudiante" + estudiante.nombre + " " ,
                  imageUrl: 'images/error.png'
                });
            })
        }

        comun2.update = function(estudiante){
            return $http.put('/estudiante/estudiante/' + estudiante._id, estudiante)
            .success(function(data){
                var indice = comun2.estudiantes.indexOf(estudiante);
                comun2.estudiantes[indice] = data;
                swal({
                  title: "Estudiante actualizado",
                  text: "El estudiante " + estudiante.nombre + " se ha actualizado correctamente",
                  imageUrl: 'images/ok.png'
                });
            })
            .error(function(error){
                swal({
                  title: "Error",
                  text: "Error al actualizar el estudiante" + estudiante.nombre + " " ,
                  imageUrl: 'images/error.png'
                });
            })
        }

        comun2.delete = function(estudiante){
            return $http.delete('/estudiante/estudiante/' + estudiante._id)
            .success(function(){
                var indice = comun2.estudiantes.indexOf(estudiante);
                comun2.estudiantes.splice(indice, 1);
            })
        }

        return comun2;
    })
    .controller('estudianteCtrl', function($scope, $state, comun2) {


        $scope.estudiante = {}
        // $scope.usuarios = [];

        comun2.getAll();

        console.log(comun2);
        // console.log(comun2.estudiantes);
        // console.log(comun2.estudiantes[0]._id);
        // console.log(comun2.estudiantes[0].nombre);



        $scope.estudiantes = comun2.estudiantes;

        $scope.agregar = function() {
            comun2.add({
                nombre:        $scope.estudiante.nombre,
                direccion:     $scope.estudiante.direccion,
                telefonos:     $scope.estudiante.telefonos,
            })

            $scope.estudiante.nombre    = '';
            $scope.estudiante.direccion = '';
            $scope.estudiante.telefonos = '';


            $state.go('estudiantes');
        }

        $scope.eliminar = function(estudiante) {
            comun2.delete(estudiante);
        }

        $scope.procesaObjeto = function(estudiante) {
            comun2.estudiante = estudiante;
            $state.go('editarEstudiante');
        }
    })
    .controller('editarEstudianteCtrl', function($scope, $state, comun2) {

        $scope.estudiante = comun2.estudiante;

        $scope.actualizar = function() {
            comun2.update($scope.estudiante);
            $state.go('estudiantes');
        }

        $scope.eliminar = function(){
            comun2.delete($scope.estudiante);
            $state.go('estudiantes');        
        }

    })
    