app.controller('GenerateCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
  'use strict';

  var model = $scope.model = {};

  model.profiles = data.model.profiles;

  model.profile = {};

  // TODO check if there is a profile selected
  // if not, change route to first profile
  if(!$routeParams.profileId) {
    // auto-select first profile and refresh the controller

    data.GetProfiles()
    .then(function() {

      $location.path('/generate/' + model.profiles[0].key);

    });

  } else {

    data.GetProfile({
      key: $routeParams.profileId
    })
    .then(function(profile) {

      angular.extend(model.profile, profile);

    });

  }

  model.showProfileMenu = false;

  $scope.ToggleProfileMenu = function() {
    model.showProfileMenu = !model.showProfileMenu;
  };

  model.showPassword = false;

  model.masterkey = '';
  model.url = '';
  model.generatedPassword = '';

  var generatePassword = function() {

    var generateParams = {};
    angular.extend(generateParams, model.profile);

    generateParams.masterkey = model.masterkey;
    generateParams.url = model.url;

    model.generatedPassword = passwordmaker.generate(generateParams);

  };

  $scope.$watchCollection('[' +
    'model.masterkey,' +
    'model.url' +
  ']', generatePassword);

  var showNotification = function() {

    var notification = new Notification('PasswordMaker', {
      body: model.generatedPassword,
      icon: 'icon.png'
    });

  };

  $scope.Notify = function() {

    // Let's check if the user is okay to get some notification
    if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      showNotification();
    }

    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // Whatever the user answers, we make sure we store the information
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }

        // If the user is okay, let's create a notification
        if (permission === 'granted') {
          showNotification();
        }
      });
    }

  };

});
