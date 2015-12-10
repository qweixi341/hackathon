angular.module('starter.controllers', [])

.controller('BuyCtrl', function($log, $scope, $state, $stateParams, $ionicPopup, dbService, localStorageService) {

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
    _init = localStorageService.get("__username")
    $log.debug(_init);
    dbService.getAllOrdersID().then(function(data) {  
      _addID = data.result;
      dbService.setOrder(["orders/" + _addID, {
        ID : _addID,
        Init: _init, 
        Vendor: $scope.selectedVendor, 
        ExpriyTime : expiry,
        ReadyForCollection : false,
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

.controller('OrdersCtrl', function($scope, $ionicLoading, $timeout, Vendors, $state,
  $cordovaLocalNotification, $cordovaBadge, $ionicPlatform, localStorageService, dbService) {

  var _username = localStorageService.get("__username");
  $scope.myOrders = [];
  $scope.orders = [];

  
  $scope.showLoading = function(loadAnimationDuration) {
    $ionicLoading.show({
      duration : loadAnimationDuration,
      noBackdrop : true,
      template : '<p class="item-icon-left">Loading...<ion-spinner icon="bubbles"/></p>'
    });
  };

  $scope.$on('$ionicView.enter', function(e) {
    $scope.showLoading(1500);
    $scope.refreshOrders();
    $scope.refreshOrders();
  });

  $scope.$on('$stateChangeSuccess', function(event, toState) {

    //only load for searchBook state
    if (toState.name == 'tab.orders') {      
      $scope.showLoading(1500);
      $scope.refreshOrders();
    }
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

    $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
 
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
    };

    $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            console.log('Notification 3 triggered');
          });
    }; 

  });

  $scope.refreshOrders = function () {
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
    $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.getVendorThumbnail = function (name) {
    return Vendors.getThumbnailByName(name);
  };

  $scope.goToDetail = function (order) {
    $state.go('tab.order-detail', {order: JSON.stringify(order)});
  };
})

.controller('OrderDetailCtrl', function($scope, $stateParams, $state,
  dbService, $log, localStorageService) {

  console.log('OrderDetailCtrl,', JSON.parse($stateParams.order));

  var _username = localStorageService.get("__username");

  $scope.order = JSON.parse($stateParams.order);
  $scope.order.Bids = $scope.order.Bids || [];
  
  console.log($scope.order.Bids);
  
  $scope.placeOrder = function(msg) {
    var bidParams = [];
    bidParams.push($scope.order.ID);
    bidParams.push($scope.order.Bids.length + 1);
    bidParams.push({
      guestName: _username, 
      Message: msg
    });
    console.log("place order,", bidParams);
    dbService.setBids(bidParams);
    $state.go('tab.orders');
  }
  // $scope.order = dbService.getOrderdetail($stateParams.order).$$state.value.result;
  // $scope.bids = [];
  // angular.forEach($scope.order, function(value,key)
  // {
  //   $log.debug("value is:");
  //   //$log.debug(value);
  //   this.push(value);
  // }, $scope.bids);

  // $log.debug($scope.bids);
})

.controller('AccountCtrl', function($scope,localStorageService, $state) {

  $scope.owner = localStorageService.get('__username');
  $scope.seat = localStorageService.get('__seat');

  $scope.updateSeat = function(seat){
    localStorageService.set('__seat', seat);
    $scope.seat = seat;
  };

  $scope.logout = function(){
    localStorageService.set('__username','');
    localStorageService.set('__JWT','');
    $state.go('login');
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


})