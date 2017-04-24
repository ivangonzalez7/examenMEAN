     eaApp.factory('comun', function($http) {

        
        var comun = {};

        comun.asignaturas = [];

        comun.asignatura = {};

        /***Sección de métodos remotos***/
        comun.getAll = function(){
            return $http.get('/asignatura/asignaturaspop')
            .success(function(data){

                angular.copy(data, comun.asignaturas)
                console.log(comun.asignaturas[1].estudiantes[1])

                return comun.asignaturas
            })
        }

        comun.add = function(asignatura){
            return $http.post('/asignatura/asignatura', asignatura)
            .success(function(asignatura){
                comun.asignaturas.push(asignatura);
                swal({
                  title: "Asignatura Creada",
                  text: "La asignatura " + asignatura.nombre + " se ha creado correctamente",
                  imageUrl: 'images/ok.png'
                });
            })
            .error(function(error){
                swal({
                  title: "Error",
                  text: "Error al crear la asignatura" + asignatura.nombre + " " ,
                  imageUrl: 'images/error.png'
                });
            })
        }

        comun.update = function(asignatura){
            return $http.put('/asignatura/asignatura/' + asignatura._id, asignatura)
            .success(function(data){
                var indice = comun.asignaturas.indexOf(asignatura);
                comun.asignaturas[indice] = data;
                swal({
                  title: "Asignatura Actualizada",
                  text: "La asignatura " + asignatura.nombre + " se ha actualizado correctamente",
                  imageUrl: 'images/ok.png'
                });
            })
            .error(function(error){
                swal({
                  title: "Error",
                  text: "Error al actualizar la asignatura" + asignatura.nombre + " " ,
                  imageUrl: 'images/error.png'
                });
            })
        }

        comun.delete = function(asignatura){
            return $http.delete('/asignatura/asignatura/' + asignatura._id)
            .success(function(){
                var indice = comun.asignaturas.indexOf(asignatura);
                comun.asignaturas.splice(indice, 1);
            })
        }

        return comun;
    })
    .controller('asignaturaCtrl', function($scope, $state, comun) {


        $scope.asignatura = {}
        // $scope.usuarios = [];

        comun.getAll();

        console.log(comun);
        console.log(comun.asignatura);
        console.log(comun.asignaturas[0]);

        $scope.asignaturas = comun.asignaturas;

        $scope.agregar = function() {
            comun.add({
                nombre:        $scope.asignatura.nombre,
                estudiantes:   $scope.asignatura.estudiantes
            })

            $scope.asignatura.nombre   = '';
            $scope.asignatura.estudiantes = '';

            $state.go('asignaturas');
        }

        $scope.eliminar = function(asignatura) {
            comun.delete(asignatura);
        }

        $scope.procesaObjeto = function(asignatura) {
            comun.asignatura = asignatura;
            $state.go('editarAsignatura');
        }

        $scope.addEstudianteAsignatura = function () {
            // console.log(id);
            $http.put('/addEstudianteAsignatura/'+ $scope.asignatura.nombre+'/'+$scope.estudiante.nombre).success(function (response){

                console.log("Añadimos" + $scope.asignatura.nombre);
                console.log('OK!!');
            })
        }; 

    })
    .controller('editarAsignaturaCtrl', function($scope, $state, comun) {

        $scope.asignatura = comun.asignatura;

        $scope.actualizar = function() {
            comun.update($scope.asignatura);
            $state.go('asignaturas');
        }

        $scope.eliminar = function(){
            comun.delete($scope.asignatura);
            $state.go('asignaturas');        
        }

    })
    