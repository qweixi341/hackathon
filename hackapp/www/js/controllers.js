angular.module('starter.controllers', [])

.controller('BuyCtrl', function($scope, $state, $stateParams) {

  console.log('refresh');
  $scope.selectedVendor = $stateParams.vendor;
  $scope.selectedTime = $stateParams.timeout;

  $scope.goBuyVendors = function() {
    $state.go('tab.buy-vendors', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime });
  };
  $scope.goBuyTime = function() {
    $state.go('tab.buy-time', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime });
  };

  $scope.confirmBuy = function() {
    console.log($scope.selectedVendor, '+', $scope.selectedTime);
  };

})

.controller('VendorCtrl', function($scope, $state, $stateParams, Vendors) {

  $scope.vendors = Vendors.all();

  $scope.selectVendor = function(name) {
    console.log('selectVendor, ', name);
    $state.go('tab.buy', {vendor : name, timeout : $stateParams.timeout});
  };
})

.controller('TimeoutCtrl', function($scope, $state, $stateParams) {

  $scope.selectTime = function(time) {
    $scope.selectedTime = time;
    console.log('selectTime, ', time);
    $state.go('tab.buy', {vendor : $stateParams.vendor, timeout : time});
  };
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
})

.controller('OrdersCtrl', function($scope, Orders) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.orders = Orders.all();
  $scope.remove = function(order) {
    Orders.remove(order);
  };
})

.controller('OrderDetailCtrl', function($scope, $stateParams, Orders) {
  $scope.order = Orders.get($stateParams.orderId);
})

.controller('AccountCtrl', function($scope,localStorageService) {

  $scope.owner = localStorageService.get('__username');
  $scope.getSeat = localStorageService.get('__seat');

  $scope.seat = function(seat){
    localStorageService.set('__seat');
    $scope.seat = seat;
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
