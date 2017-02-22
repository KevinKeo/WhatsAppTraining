angular.module('starter.auth.srv', [])

.factory('AuthSrv', function($firebaseAuth, $http, $log, $q, Contacts) {
   var auth = $firebaseAuth();
    return {
      inscription: function(firstName, lastName, email, password) {
        return auth.$createUserWithEmailAndPassword(email, password).then(function(user){
          return Contacts.add(user.uid, firstName, lastName, email,password);
        });
      },
      connexion: function(email, password) {
        return auth.$signInWithEmailAndPassword(email, password);
      },
      user: function() {
        var user = auth.$getAuth();
        return {
          id: user.uid,
          email: user.email
        }
      },
      signOut: function(){
        return auth.$signOut();
      },

      isLogged: function() {
        return auth.$requireSignIn();
      }
    };
  
});
