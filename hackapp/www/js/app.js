// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.orders', {
    url: '/orders',
    views: {
      'tab-orders': {
        templateUrl: 'templates/tab-orders.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.order-detail', {
    url: '/orders/:chatId',
    views: {
      'tab-orders': {
        templateUrl: 'templates/order-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.buy', {
    url: '/buy',
    views: {
      'tab-buy': {
        templateUrl: 'templates/tab-buy.html',
        controller: 'BuyCtrl'
      }
    }
  })
  .state('tab.buy-vendors', {
    url: '/buy/vendors',
    views: {
      'tab-buy': {
        templateUrl: 'templates/buy-vendors.html',
        controller: 'BuyCtrl'
      }
    }
  })
  .state('tab.buy-time', {
    url: '/buy/time',
    views: {
      'tab-buy': {
        templateUrl: 'templates/buy-time.html',
        controller: 'BuyCtrl'
      }
    }
  })

  .state('tab.buy-summary', {
    url: '/buy/summary',
    views: {
      'tab-buy': {
        templateUrl: 'templates/buy-summary.html',
        controller: 'BuyCtrl'
      }
    }
  })

  .state('tab.summary', {
    url: '/summary',
    views: {
      'tab-summary': {
        templateUrl: 'templates/tab-summary.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
