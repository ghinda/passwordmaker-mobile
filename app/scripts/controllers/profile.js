app.controller('ProfileCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
  'use strict';

  var model = $scope.model = {};
  var root = $rootScope.root;

  model.showConfirmDelete = false;

  model.profile = {};

  model.leetValues = [];

  for(var i = 0; i < 10; i++) {
    model.leetValues.push({
      label: i
    });
  }

  if($routeParams.profileId) {

    data.GetProfile({
      id: $routeParams.profileId * 1
    })
    .then(function(profile) {

      angular.copy(profile, model.profile);

    });

  } else {

    // create new profile
    angular.copy(data.model.defaultProfile, model.profile);

    model.profile.name = 'New profile';

  }

  $scope.SaveProfile = function() {

    data.SaveProfile(model.profile);

    $rootScope.Go('/generate/' + model.profile.id, 'popdown');

  };

  $scope.DeleteProfile = function() {

    if(model.showConfirmDelete) {
      data.DeleteProfile(model.profile);
      $rootScope.Go('/generate', 'popdown');
    } else {
      model.showConfirmDelete = true;
    }

  };

});
