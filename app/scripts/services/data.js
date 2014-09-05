/* Data service
 */

app.factory('data', function($rootScope, $http, $q) {
  'use strict';

  // environments
  var env = 'local';

  // local models
  var model = {
    profiles: [
      {
        key: '1',
        name: 'Profile1',

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
      },
      {
        key: '2',
        name: 'Profile2',

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
      }
    ]
  };

  // get list of profiles
  var GetProfiles = function(params) {
    var deferred = $q.defer();

    // TODO get from localforage

    deferred.resolve(model.profiles);

    // TODO nothing in localstorage?
    // create the first 'default' profile

    //deferred.reject(err);

    return deferred.promise;
  };

  var GetProfile = function(params) {
    var deferred = $q.defer();

    angular.forEach(model.profiles, function(profile) {

      if(params.key === profile.key) {
        deferred.resolve(profile);
        return false;
      }

    });

    //deferred.reject(err);

    return deferred.promise;
  };

  var SaveProfile = function(params) {

    var deferred = $q.defer();

    if(params.key) {

      angular.forEach(model.profiles, function(profile) {

        if(params.key === profile.key) {

          angular.extend(profile, params);

          deferred.resolve(profile);

          return false;
        }

      });

    } else {

      // TODO if no param.key
      // create new profile
      params.key = Date.now();

      model.profiles.push(params);

      deferred.resolve(params);

    }

    //deferred.reject(err);

    return deferred.promise;

  };

  return {
    env: env,

    model: model,
    GetProfiles: GetProfiles,
    GetProfile: GetProfile,
    SaveProfile: SaveProfile
  };

});
