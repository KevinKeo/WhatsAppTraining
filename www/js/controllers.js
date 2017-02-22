angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('ContactsCtrl', function($scope,Contacts) {
  $scope.contacts = Contacts.all();
  $scope.remove = function(contact) {
    Contacts.remove(contact);
  };
})


.controller('ConversationsCtrl', function($scope,Conversations) {
    $scope.conversations = Conversations.all();
    $scope.remove = function(conversation) {
    Conversations.remove(conversation);
  };
})

.controller('ConversationsAddCtrl', function($scope,$state, $stateParams,Conversations) {
  $scope.formData={};
  $scope.addConv = function(){  
    Conversations.addConv($scope.formData.nameConv,$scope.formData.description).then(
      function(){
        $scope.formData.nameConv="";
        $scope.formData.description="";
        $state.go('tab.conversations');
      },
      function(err){
        console.log(err);
        $scope.formData.errmsg = err.message;
      }
    );
  };
})

.controller('ConversationDetailCtrl', function($scope, $stateParams, Conversations,moment,AuthSrv,Contacts) {
  $scope.conv = Conversations.get($stateParams.conversationId);
  $scope.formData = {};
  $scope.addMessage = function() {
    var id = AuthSrv.user().id;
    Contacts.get(id).$loaded().then(
    function(result){
       $scope.formData.name=result.firstName+" "+result.lastName;
       Conversations.addMessage(id,$scope.formData.name,$stateParams.conversationId,$scope.formData.text);
       $scope.formData.text = "";
      }
    );
    
  };
})
.controller('ConnexionCtrl', function($scope,$state,AuthSrv) {
  $scope.formData={};

  $scope.connexion = function(){
    AuthSrv.connexion($scope.formData.email,$scope.formData.password).then(
    function(authData){
        $state.go('tab.contacts');
      },
      function(err) {
        console.log(err);
        $scope.formData.errmsg = err.message;
      }
    );
    $scope.formData.password="";
  }
})

.controller('InscriptionCtrl', function($scope,$state,AuthSrv) {
  $scope.formData={};

  $scope.inscription = function() {
       AuthSrv.inscription($scope.formData.prenom, $scope.formData.nom, $scope.formData.email, $scope.formData.password).then(
        function() {
           $scope.formData = {};
           $state.go('new.connexion');
         },
         function(err) {
           console.log(err);
           $scope.formData.errmsg = err.message;
         }
      );
    }
})
.controller('AccountCtrl', function($scope,$state,$ionicHistory,AuthSrv) {
  $scope.deconnexion = function(){
    AuthSrv.signOut().then(
    function() {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('new.connexion');
    },
    function(err) {
      console.log(err);
    });
    };
});
