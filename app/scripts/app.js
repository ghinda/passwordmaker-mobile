/* PasswordMaker Mobile app
*/

var app = angular.module('passwordmaker-mobile', [
  'ngRoute',
  'ngTouch',
  'ngAnimate'
]).config(function($routeProvider, $compileProvider) {
  'use strict';

  $routeProvider
  .when('/generate/:profileId?', {
    templateUrl: 'views/generate.html',
    controller: 'GenerateCtrl'
  })
  .when('/profile/:profileId?', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  })
  .otherwise({
    redirectTo: '/generate'
  });

  // AngularJS doesn't trust app:// protocol by default, which is the protocol
  // Firefox OS uses for packaged apps
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);

});

app.run(function($rootScope, $location, $timeout, data){
  'use strict';

  var root = $rootScope.root = {};

  root.profiles = data.model.profiles;

  $rootScope.$watch('root.profiles', function() {
    data.SaveProfiles();
  }, true);

  $rootScope.Go = function(path, pageAnimation) {
    root.viewTransition = pageAnimation;

    $location.path(path);
  };

  // field clear method for x button on fields
  $rootScope.ClearModel = function(model, prop, event) {
    model[prop] = '';

    return event.preventDefault();
  };

});
