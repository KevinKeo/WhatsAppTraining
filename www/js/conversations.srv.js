"use strict";
angular.module('starter.conversations.srv', [])

.factory('Conversations', function($http,$firebaseObject,$firebaseArray,$firebaseAuth) {

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  // Might use a resource here that returns a JSON array
/*
  // Some fake testing data
  var conversations = [{
    id: 0,
    convName: "Conversation de ouf",
    description: "description",
    date: '12:30 08/02/17',
    messages: ["premier msg","deuxiememsg", "deuxiememsg", "fesfse msg", "ffesesfse msg", "dernier msge","testest","resrser","rest",",resp"],
    lastMessage: "dernier msg"
  },{
    id: 1,
    convName: "Conversation de ouf2 ",
    description: "description",
    date: '12:30 08/02/17',
    messages: ["premier msg","deuxiememsg", "deuxiememsg", "fesfse msg", "ffesesfse msg", "dernier msge","testest","resrser","rest",",resp"],
    lastMessage: "dernier msg"
  }
  ];
*/
/*
  var conversations=[];

  var ref = firebase.database().ref();

   $http.get('../data/conversations.json').then(function(result){
    for (var i = 0; i < result.data.length; i++) {
       conversations.push(result.data[i].conversation);
    }
  });
*/
  return {
    all: function() {
        return $firebaseArray(ref.child('conversations'));;
    },

    remove: function(conversation) {
      $firebaseObject(ref.child('conversations').child(conversation.$id).remove());
    },
    
    get: function(conversationId) {
      return $firebaseObject(ref.child('conversations').child(conversationId));
    },

    addMessage: function(userId,userName,conversationId, message) {
      var result = $firebaseObject(ref.child('conversations').child(conversationId));
      var date = new Date().getTime();
      var msg = {
            "userId": userId,
            "userName": userName,
            "message": message,
            "date": date
        };
     $firebaseArray(ref.child('conversations').child(conversationId).child('messages')).$add(msg);
     ref.child('conversations').child(conversationId).child('lastMessage').set(message);
     ref.child('conversations').child(conversationId).child('lastDate').set(date);
  },

    addConv: function(cName,desc){
      if(desc==null || desc==undefined){
        desc="";
      }
      var conv = 
      {
        convName: cName,
        description: desc,
        lastMessage:"",
        lastDate: new Date().getTime(),
        face: "img/ionic.png"
      };

      return $firebaseArray(ref.child('conversations')).$add(conv);
    }
  };
});
