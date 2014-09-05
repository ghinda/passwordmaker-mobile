app.controller('ProfileCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
  'use strict';

  var model = $scope.model = {};

  model.profile = {};

  model.leetValues = [];

  for(var i = 0; i < 10; i++) {
    model.leetValues.push({
      label: i
    });
  }

  if(!$routeParams.profileId) {

    // TODO create new profile

  } else {

    data.GetProfile({
      key: $routeParams.profileId
    })
    .then(function(profile) {

      angular.copy(profile, model.profile);

    });

  }

  $scope.SaveProfile = function() {

    data.SaveProfile(model.profile);

    $rootScope.Go('/generate/' + model.profile.key, 'popdown');

  };

});
