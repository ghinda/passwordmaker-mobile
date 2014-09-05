/* PasswordMaker Mobile app
*/

var app = angular.module('passwordmaker-mobile', [
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'LocalForageModule'
]).config(function($routeProvider, $compileProvider, $parseProvider) {
  'use strict';

  $routeProvider
  .when('/generate/:profileId?', {
    templateUrl: 'views/generate.html',
    controller: 'GenerateCtrl'
  })
  .when('/profile/:profileId?', {
    templateUrl: 'views/edit.html',
    controller: 'EditCtrl'
  })
  .otherwise({
    redirectTo: '/generate'
  });

  // AngularJS doesn't trust app:// protocol by default, which is the protocol
  // Firefox OS uses for packaged apps
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);

  $parseProvider.unwrapPromises(true);

});

app.run(function($rootScope, $location, $timeout){
  'use strict';

  var root = $rootScope.root = {};

  $rootScope.Go = function(path, pageAnimation) {
    root.viewTransition = pageAnimation;

    $location.path(path);
  };

  $rootScope.GoBack = function() {
    window.history.back();
  };

  // field clear method for x button on fields
  $rootScope.ClearModel = function(model, prop, event) {
    model[prop] = '';

    return event.preventDefault();
  };

});
