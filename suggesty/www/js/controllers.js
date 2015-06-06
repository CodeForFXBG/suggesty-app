angular.module('suggesty.controllers', [])
.controller('SuggestionSubmitCtrl', function($scope, $state, Suggestions) {
  $scope.types = ['Traffic', 'Litter', 'Maintenance', 'Landscaping', 'Other']
  $scope.suggest = function(suggestion){
    Suggestions.submit(JSON.parse(JSON.stringify(suggestion))).then(function(){
      $state.go('tab.suggestions')
    })
  }
})
.controller('SuggestionCtrl', function($scope, $state, Suggestions) {
  $scope.$on('$ionicView.enter', function(e) {
    Suggestions.all().then(function(res){
      $scope.suggestions = res.data
    })
  })
})
.controller('SuggestionDetailsCtrl', function($scope, $stateParams, Suggestions){
  $scope.$on('$ionicView.enter', function(e) {
    Suggestions.get($stateParams.id).then(function(res){
      $scope.suggestion = res.data
    })
  })
});
