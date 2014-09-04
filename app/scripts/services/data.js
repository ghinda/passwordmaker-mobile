/* Data service
 */

app.factory('data', function($rootScope, $http, $q) {
  'use strict';

  // local testing urls
  var env = 'local';

  // dev
  if(document.domain.indexOf('development.') !== -1) {
    env = 'dev';
  }

  // stage
  if(document.domain.indexOf('staging.') !== -1) {
    env = 'stage';
  }

  // live
  if(document.domain.indexOf('www.') !== -1) {
    env = 'live';
  }

  if(env === 'dev') {
    apiUrl = 'https://dev-bizcardmaker.rhcloud.com';
  }

  if(env === 'live' || env === 'stage') {
    apiUrl = 'https://live-bizcardmaker.rhcloud.com';
    printchompUrl = 'https://printchomp.com';
  }

  // local model
  var model = {
    offers: []
  };

  // get list of offers
  var GetOffers = function() {
    var deferred = $q.defer();

    $http.get(apiUrl + '/api/v1/offers')
    .success(function(response) {

      deferred.resolve(response);

    }).error(function(err) {

      deferred.reject(err);

    });

    return deferred.promise;
  };

  return {
    env: env,

    model: model,
    GetOffers: GetOffers
  };

});
