angular.module('starter.controllers', [])

.controller('BuyCtrl', function($scope, $state, Vendors) {

  // var hasPendingOrder = localStorageService.get('hasPendingOrder');
  // if(hasPendingOrder) {
  //   $state.go('tab/buy/summary');
  // }
  var selectedVendor;
  var selectedTime;

  $scope.vendors = Vendors.all();

  $scope.selectVendor = function(id) {
    selectedVendor = id;
    $state.go('tab.buy');
  };

  $scope.selectTime = function(time) {
    selectedTime = time;
    $state.go('tab.buy');
  };

  $scope.confirmBuy = function() {
    if(typeof selectedTime === 'undefined'
      || typeof selectedTime === 'undefined'){
      return;
    }
  };

})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
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
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $log, $state, loginService, localStorageService, jwtParserService) {
  $scope.data = {};    
  //un-comment below to enable debug mode.
  //$state.go('tab.scan');
  var _JWT = localStorageService.get('__JWT');     
  jwtParserService.parseJWTclaim(_JWT)    
  .success(function(data)
    {   
      $log.debug("User has already logged in.");
      $state.go('tab.orders');
  })
  .error(function(data)
  {
        $log.debug("No User record found. Proceed with login.");
  });
  $scope.login = function() {     
      loginService.loginUser($scope.data.username, $scope.data.password);
  };
});
