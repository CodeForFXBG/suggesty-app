angular.module('suggesty.services', [])
.factory('Suggestions', function($http, $filter){
  var suggestions = [
        {id:0,severity:'high',text:'Please fix pothole', location:'Fredericksburg, VA'},
        {id:1,severity:'low',text:'Trim that tree',location:'Washington, D.C'}
      ]
  return {
    submit: function(suggestion){
      suggestion.id = suggestions.length
      suggestion.severity = 'low'
      suggestion.location = 'anywhere, USA'
      suggestions.push(suggestion)
      return $http.post('http://www.suggesty.org/suggestions', suggestion)
    },
    all : function(){
      return suggestions
    },
    get : function(id){
      for (var i = 0; i < suggestions.length; i++) {
        if (suggestions[i].id === parseInt(id)) {
          return suggestions[i];
        }
      }
      return null;
    }
  }
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
