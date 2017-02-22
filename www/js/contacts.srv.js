angular.module('starter.contacts.srv', [])

.factory('Contacts', function($http,$firebaseObject,$firebaseArray) {

  var ref = firebase.database().ref();
 /* var contacts = [];
  $http.get('../data/contacts.json').then(function(result){
    for (var i = 0; i < result.data.length; i++) {
       contacts.push(result.data[i].users);
    }
  });
*/
  return {
    all: function() {
         return $firebaseArray(ref.child('users'));
    },
    remove: function(contact) {
      $firebaseObject(ref.child('users').child(contact.$id).remove());
    },

    get: function(contactId) {
       return $firebaseObject(ref.child('users').child(contactId))
    },
  
    add: function(id, prenom, nom, email,password) {
        var user = {
          firstName: prenom,
          lastName: nom,
          email: email,
          password:password,
          face: 'img/max.png'
      }
      return ref.child('users').child(id).set(user);
    }
  };
});
