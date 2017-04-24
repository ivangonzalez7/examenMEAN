var eaApp = angular.module('eaApp', ['ui.router','ngTable','ngResource'])

    eaApp.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('asignaturas', {
            url: '/asignaturas',
            templateUrl: 'vistas/vistaAsignaturas/asignaturas.html',
            controller: 'asignaturaCtrl'
          })
          .state('addAsignatura', {
            url: '/addAsignatura',
            templateUrl: 'vistas/vistaAsignaturas/addAsignatura.html',
            controller: 'asignaturaCtrl'
          })
          .state('editarAsignatura', {
              url: '/editarAsignatura',
              templateUrl: 'vistas/vistaAsignaturas/editarAsignatura.html',
              controller: 'editarAsignaturaCtrl'
          })
          .state('estudiantes', {
              url: '/estudiantes',
              templateUrl: 'vistas/vistaEstudiantes/estudiantes.html',
              controller: 'estudianteCtrl'
          })
          .state('editarEstudiante', {
              url: '/editarEstudiante',
              templateUrl: 'vistas/vistaEstudiantes/editarEstudiante.html',
              controller: 'editarEstudianteCtrl'
          })
          .state('addEstudiante', {
              url: '/addEstudiante',
              templateUrl: 'vistas/vistaEstudiantes/addEstudiante.html',
              controller: 'estudianteCtrl'
          });
    $urlRouterProvider.otherwise('asignaturas');
})

