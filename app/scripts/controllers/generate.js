app.controller('GenerateCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
  'use strict';

  var model = $scope.model = {};
  var root = $rootScope.root;

  model.profile = {};
  model.copyDone = false

  // check if there is a profile selected
  if($routeParams.profileId) {

    data.GetProfile({
      id: $routeParams.profileId * 1
    })
    .then(function(profile) {

      $timeout(function() {
        model.profile = profile;
      });

    })
    .catch(function() {

      // wrong id
      // auto-select first profile
      $location.path('/generate/' + root.profiles[0].id);

    });

  } else {

    // auto-select first profile
    data.GetProfiles()
    .then(function() {

      $location.path('/generate/' + root.profiles[0].id);

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
      icon: window.location.origin + '/images/icons/passwordmaker-mobile-icon-48.png'
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

  $scope.Copy = function() {
    document.querySelector('.password-generated input').select()

    try {
      document.execCommand('copy')

      model.copyDone = true
      $timeout(() => {
        model.copyDone = false
      }, 2000)
    } catch (err) {}

  };

});
