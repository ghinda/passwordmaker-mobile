app.controller('GenerateCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, $q, data) {
  'use strict';

  var model = $scope.model = {};

  // TODO check if there is a profile selected
  // if not, change route to first profile

  model.showProfileMenu = false;

  $scope.ToggleProfileMenu = function() {
    model.showProfileMenu = !model.showProfileMenu;

    console.log(model.showProfileMenu);
  };

  $scope.Notify = function() {

    // Let's check if the user is okay to get some notification
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
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
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }

  };

});
