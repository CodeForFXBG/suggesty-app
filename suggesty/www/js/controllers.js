angular.module('suggesty.controllers', [])
.controller('SuggestionSubmitCtrl', function($scope, $state, Suggestions) {
  $scope.types = ['Traffic', 'Litter', 'Maintenance', 'Landscaping']
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
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
