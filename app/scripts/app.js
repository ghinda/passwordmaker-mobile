/* PasswordMaker Mobile app
*/

var app = angular.module('passwordmaker-mobile', [
  'ngRoute',
  'ngTouch'
]).config(function($routeProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    templateUrl: 'views/generator.html',
    controller: 'GeneratorCtrl'
  }).otherwise({
    redirectTo: '/'
  });

});

app.run(function($rootScope){
  'use strict';

  var root = $rootScope.root = {};



});
