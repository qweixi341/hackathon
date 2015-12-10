angular.module('starter.controllers', [])

.controller('BuyCtrl', function($log, $scope, $state, $stateParams, $ionicPopup, Orders, dbService, localStorageService) {

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
    var expiry = moment().add(parseInt($scope.selectedTime), 'minutes').format();
    console.log(expiry);    
    _init = localStorageService.get("__username");

    $log.debug(_init);
    dbService.getAllOrdersLength().then(function(data) {  
      _addID = data.result;
      dbService.setOrder(["orders/" + _addID, {
        Init: _init, 
        Vendor: $scope.selectedVendor, 
        ExpriyTime : expiry,
        Bids: {}
      }]);   
    });
    var alertPopup = $ionicPopup.alert({
        title : 'Success',
        template : 'You have successfully created an order.'
    });
    $state.go('tab.orders');
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

.controller('OrdersCtrl', function($scope, Orders, $timeout, 
  $cordovaLocalNotification, $ionicPlatform, localStorageService, dbService) {


  var _username = localStorageService.get("__username");
  $scope.myOrders = [];
  $scope.orders = [];
  var refresh = function() {
    dbService.getAllOrders().then(function(data){
      console.log("received, ", data.result);
      $scope.orders = data.result;

      data.result.map(function(order) {
        for(var i in $scope.myOrders) {
          if($scope.myOrders[i].ID == order.ID){
            console.log('exist');
            return;
          }
        }

        if (order.Init === _username) {
          $scope.myOrders.push(order);
        }
        else if (typeof order.Bids !== 'undefined') {
          order.Bids.map(function(bid) {
            if(bid.guestName === _username)
              $scope.myOrders.push(order);
          });
        }
      });
    });
  };
  refresh();

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    refresh();
  });
  
  $ionicPlatform.ready(function () {       
    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Warning',
        text: 'Your order has arrived!',
        data: {
          customProperty: 'custom value'
        }
      }).then(function (result) {
        console.log('Notification 1 triggered');
      });
    };
  });

  $scope.refreshOrders = function () {
    refresh();
    $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
    });
  }
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
    localStorageService.set('__seat', seat);
    $scope.seat = seat;
  };

  $scope.logout = function() {

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
