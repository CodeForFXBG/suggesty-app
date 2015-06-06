angular.module('suggesty.services', [])
.factory('Suggestions', function($http, $cordovaGeolocation){
  var url = 'http://suggesty.org';
  return {
    submit: function(suggestion){
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      return $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          suggestion.latitude= position.coords.latitude;
          suggestion.longitude= position.coords.longitude;

          return $http.post(url + '/suggestions', suggestion);
        }, function(err) {
          // error
          console.log(err, 'could not get location');
          return $http.post(url + '/suggestions', suggestion);
        });
    },
    all : function(){
      return $http.get(url + '/suggestions')
    },
    get : function(id){
      return $http.get(url + '/suggestions/' + id)
    }
  }
});
