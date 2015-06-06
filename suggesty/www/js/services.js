angular.module('suggesty.services', [])
  .factory('LocalStorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])
  .factory('Suggestions', function($http, LocalStorage){
    var url = 'http://suggesty.org';
    return {
      submit: function(suggestion){
        var coords = LocalStorage.getObject('latLonLocation');
        suggestion.latitude = coords.latitude || 0.0;
        suggestion.longitude = coords.longitude || 0.0;
        suggestion.location = LocalStorage.get('fineLocation', "Unknown");
        return $http.post(url + '/suggestions', suggestion);
      },
      all : function(){
        return $http.get(url + '/suggestions')
      },
      get : function(id){
        return $http.get(url + '/suggestions/' + id)
      }
    }
  })
  .factory('Location', function($cordovaGeolocation, LocalStorage){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    return {
      getLocation: function() {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            LocalStorage.setObject('latLonLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude });

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            geocoder.geocode({'latLng': latlng}, function(res, s){
              if (s == google.maps.GeocoderStatus.OK) {
                if(res.length){
                  LocalStorage.setObject('fineLocation', res[0]);
                } else {
                  console.log('no matching address');
                }
              } else {
                console.log('cound not reerse lookup');
              }
            });
          }, function (err) {
            // error
            console.log(err, 'could not get location');
          });
      }
    }
  })
;
