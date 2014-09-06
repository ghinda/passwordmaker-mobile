/* Data service
 */

app.factory('data', function($rootScope, $http, $q, $timeout) {
  'use strict';

  // in case we don't have any profiles in db
  var defaultProfile = {
    name: 'Default',

    url_protocol: false,
    url_subdomain: false,
    url_domain: true,
    url_path: false,

    // use this text instead of url if not null
    strUseText: '',

    selectedCharset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

    hashAlgorithm: 'md5',

    whereToUseL33t: 'off',
    l33tLevel: 0,

    username: '',
    modifier: '',

    passwordLength: 8,
    passwordPrefix: '',
    passwordSuffix: ''
  };

  // local models
  var model = {
    defaultProfile: defaultProfile,
    profiles: []
  };

  // get list of profiles
  var GetProfiles = function(params) {
    var deferred = $q.defer();

    if(model.profiles.length) {

      deferred.resolve(model.profiles);

    } else {
      // get from localforage
      localforage.getItem('profiles')
      .then(function(storedProfiles) {

        if(storedProfiles && storedProfiles.length) {

          model.profiles.length = 0;
          [].push.apply(model.profiles, storedProfiles);

        } else {

          // default profile
          var firstProfile = {};
          angular.copy(defaultProfile, firstProfile);
          firstProfile.id = Date.now();

          model.profiles.push(firstProfile);

        }

        deferred.resolve(model.profiles);

      });
    }

    //deferred.reject(err);

    return deferred.promise;
  };

  var GetProfile = function(params) {
    var deferred = $q.defer();

    var findProfile = function() {

      var foundProfile;

      angular.forEach(model.profiles, function(profile) {

        if(params.id === profile.id) {
          foundProfile = profile;
          return false;
        }

      });

      if(foundProfile) {
        deferred.resolve(foundProfile);
      } else {
        // dindn't find the profile?
        // must have a wrong id
        deferred.reject();
      }

    };

    if(model.profiles.length) {
      findProfile();
    } else {
      GetProfiles()
      .then(findProfile);
    }

    return deferred.promise;
  };

  var SaveProfile = function(params) {

    var deferred = $q.defer();

    if(params.id) {

      angular.forEach(model.profiles, function(profile) {

        if(params.id === profile.id) {

          angular.extend(profile, params);

          deferred.resolve(profile);

          return false;
        }

      });

    } else {

      // if no param.id
      // create new profile
      params.id = Date.now();

      model.profiles.push(params);

      deferred.resolve(params);

    }

    //deferred.reject(err);

    return deferred.promise;

  };

  var SaveProfiles = function(params) {

    var deferred = $q.defer();

    if(model.profiles.length) {

      // save with localforage
      localforage.setItem('profiles', model.profiles);

      deferred.resolve(model.profiles);

    } else {

      deferred.reject();

    }

    return deferred.promise;

  };

  var DeleteProfile = function(params) {

    var deferred = $q.defer();

    angular.forEach(model.profiles, function(profile, index) {

      if(params.id === profile.id) {
        model.profiles.splice(index, 1);

        deferred.resolve(profile);
        return false;
      }

    });

    //deferred.reject(err);

    return deferred.promise;

  };

  return {
    model: model,

    GetProfiles: GetProfiles,
    SaveProfiles: SaveProfiles,

    GetProfile: GetProfile,
    SaveProfile: SaveProfile,
    DeleteProfile: DeleteProfile
  };

});
