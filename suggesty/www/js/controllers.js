angular.module('suggesty.controllers', [])
.controller('SuggestionSubmitCtrl', function($scope, $state, Suggestions) {
  $scope.suggest = function(suggestion){
    Suggestions.submit(JSON.parse(JSON.stringify(suggestion)))
    suggestion.text = ""
    suggestion.id = ""
    suggestion.severity = ""
    $state.go('tab.suggestions')
  }
})
.controller('SuggestionCtrl', function($scope, $state, Suggestions) {
  $scope.suggestions = Suggestions.all()
})
.controller('SuggestionDetailsCtrl', function($scope, $stateParams, Suggestions){
  $scope.suggestion = Suggestions.get($stateParams.id)
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
