// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angularMoment','firebase'])
.run(function($ionicPlatform,amMoment) {
  amMoment.changeLocale('fr');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go('new.connexion');
      }
    })
}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
    'auth': function (AuthSrv) {
        return AuthSrv.isLogged();
      }
    }
  })
  .state('new', {
    url: '/new',
    abstract: true,
    templateUrl: 'templates/news.html',
      resolve: {
      'auth': function (AuthSrv,$state) {
        AuthSrv.isLogged().then(
          function(){
            $state.go('tab.contacts');
          },
          function(err){
            console.log(err);
          }
        );
      }
    }
  })
 .state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/tab-contacts.html',
          controller: 'ContactsCtrl'
        }
      }
  })
 .state('tab.conversations', {
      url: '/conversations',
      views: {
        'tab-conversations': {
          templateUrl: 'templates/tab-conversations.html',
          controller: 'ConversationsCtrl'
        }
      }
    })
  .state('tab.conversationsAdd', {
      url: '/conversations/add',
      views: {
        'tab-conversationsAdd': {
          templateUrl: 'templates/conversations-add.html',
          controller: 'ConversationsAddCtrl'
        }
      }
    })
 .state('tab.conversationDetail', {
      url: '/conversations/:conversationId',
      views: {
        'tab-conversationDetail': {
          templateUrl: 'templates/tab-conversationsDetail.html',
          controller: 'ConversationDetailCtrl'
        }
      }
    })
  .state('new.connexion', {
      url: '/connexion',
      views: {
        'new-connexion': {
          templateUrl: 'templates/new-connexion.html',
          controller: 'ConnexionCtrl'
        }
      }
  })
  .state('new.inscription', {
      url: '/inscription',
      views: {
        'new-inscription': {
        templateUrl: 'templates/new-inscription.html',
        controller: 'InscriptionCtrl'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/new/connexion');

});

