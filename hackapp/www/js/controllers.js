angular.module('starter.controllers', [])

.controller('BuyCtrl', function($scope, $state, $stateParams, Orders) {

  $scope.selectedVendor = $stateParams.vendor;
  $scope.selectedTime = $stateParams.timeout;
  $scope.selectedTimeDisplay = $stateParams.timeout ? 'In ' + $stateParams.timeout + ' minutes' : '';

  $scope.goBuyVendors = function() {
    $state.go('tab.buy-vendors', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime });
  };
  $scope.goBuyTime = function() {
    $state.go('tab.buy-time', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime });
  };

  $scope.confirmBuy = function() {
    console.log($scope.selectedVendor, ' + ', $scope.selectedTime);
    var expiry = moment().add(parseInt($scope.selectedTime), 'minutes').format();
    console.log(expiry);
    
    Orders.create({
      vendor: $scope.selectedVendor,
      expiry: expiry
    });
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

.controller('OrdersCtrl', function($scope, Orders, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.refreshOrders = function ()
  {
    $scope.orders = Orders.all();
    $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
    });
  }



  $scope.orders = Orders.all();
})

.controller('OrderDetailCtrl', function($scope, $stateParams, Orders, dbService, $log) {
  $scope.order = dbService.getOrderdetail($stateParams.orderId).$$state.value.result;
  $scope.bids = [];
  angular.forEach($scope.order, function(value,key)
  {
    $log.debug("value is:");
    //$log.debug(value);
    this.push(value);
  }, $scope.bids);

  $log.debug($scope.bids);
})

.controller('AccountCtrl', function($scope,localStorageService) {

  $scope.owner = localStorageService.get('__username') ? 
                 localStorageService.get('__username')  : '';

  $scope.seat = localStorageService.get('__seat') ? 
                localStorageService.get('__seat') : '';

  $scope.updateSeat = function(seat){
    console.log('Updated seat number is ', seat);
    localStorageService.set('__seat', seat);
    $scope.seat = seat;
  };
})

.controller('MapCtrl', function($scope, $stateParams, localStorageService) {

  $scope.floor = $stateParams.mapId;
  console.log("Selected map is ", $scope.floor);
  $scope.getMapImg = function(){
    if (6 == $scope.floor)
      return "img/ADSK_L6-locationplan.png";
    else if (5 == $scope.floor)
      return "img/ADSK_L5-locationplan.png";
    else
      return "img/ADSK_L4-locationplan.png";
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
