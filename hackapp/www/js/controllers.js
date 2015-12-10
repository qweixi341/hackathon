angular.module('starter.controllers', [])

.controller('BuyCtrl', function($ionicViewService, $log, $scope, $state, $stateParams, $ionicPopup, dbService, localStorageService) {
  $scope.selectedVendor = $stateParams.vendor;
  $scope.selectedTime = $stateParams.timeout;
  $scope.selectedPantry = $stateParams.pantry;
  $scope.selectedTimeDisplay = $stateParams.timeout ? 'In ' + $stateParams.timeout + ' minutes' : '';

  $scope.goBuyVendors = function() {
    $state.go('tab.buy-vendors', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime , pantry: $scope.selectedPantry});
  };
  $scope.goBuyTime = function() {
    $state.go('tab.buy-time', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime, pantry: $scope.selectedPantry});
  };
  $scope.goBuyPantry = function() {
     $state.go('tab.buy-pantry', {vendor: $scope.selectedVendor, timeout: $scope.selectedTime, pantry: $scope.selectedPantry});
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
        Pantry: $scope.selectedPantry,
        ReadyForCollection : false,
        Pantry: $scope.selectedPantry,
        Bids: {}
      }]);   
    });
    var alertPopup = $ionicPopup.alert({
        title : 'Success',
        template : 'You have successfully created an order.'
    });
    $ionicViewService.clearHistory();
    $state.go('tab.orders');
  };
  // $scope.$on('$ionicView.enter', function(e) {
  //   $scope.refreshData();
  // };
  // var refreshData = function(){

  // };
})

.controller('VendorCtrl', function($scope, $state, $stateParams, Vendors) {
  $scope.vendors = Vendors.all();
  $scope.selectVendor = function(name) {
    console.log('selectVendor, ', name);
    $state.go('tab.buy', {vendor : name, timeout : $stateParams.timeout, pantry: $stateParams.pantry});
  };
})

.controller('TimeoutCtrl', function($scope, $state, $stateParams) {
  $scope.selectTime = function(time) {
    $scope.selectedTime = time;
    console.log('selectTime, ', time);
    $state.go('tab.buy', {vendor : $stateParams.vendor, timeout : time, pantry: $stateParams.pantry});
  };
})

.controller('PantryCtrl', function($scope, $state, $stateParams){
   $scope.selectPantry = function(pantry) {
    $scope.selectedPantry= pantry;
    console.log('selectPantry, ', pantry);
    $state.go('tab.buy', {vendor: $stateParams.vendor, timeout : $stateParams.timeout, pantry: pantry});
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


  $scope.$on('$stateChangeSuccess', function(event, toState) {

    //only load for searchBook state
    if (toState.name == 'tab.orders') {      
      $scope.showLoading(300);
      $scope.refreshOrders();
    }
  });

  // $ionicPlatform.ready(function () {      
  //   $cordovaBadge.promptForPermission();
 
  //       $scope.setBadge = function(value) {
  //           $cordovaBadge.hasPermission().then(function(result) {
  //               $cordovaBadge.set(value);
  //           }, function(error) {
  //               alert(error);
  //           });
  //       }
  //   });

  //   $scope.scheduleSingleNotification = function () {
  //     $cordovaLocalNotification.schedule({
  //       id: 1,
  //       title: 'Warning',
  //       text: 'Your order has arrived!',
  //       data: {
  //         customProperty: 'custom value'
  //       }
  //     }).then(function (result) {
  //       console.log('Notification 1 triggered');
  //     });
  //   };

  //   $scope.scheduleDelayedNotification = function () {
  //         var now = new Date().getTime();
  //         var _10SecondsFromNow = new Date(now + 10 * 1000);
 
  //         $cordovaLocalNotification.schedule({
  //           id: 2,
  //           title: 'Warning',
  //           text: 'Im so late',
  //           at: _10SecondsFromNow
  //         }).then(function (result) {
  //           console.log('Notification 2 triggered');
  //         });
  //   };

  // $scope.scheduleEveryMinuteNotification = function () {
  //   $cordovaLocalNotification.schedule({
  //     id: 3,
  //     title: 'Warning',
  //     text: 'Dont fall asleep',
  //     every: 'minute'
  //   }).then(function (result) {
  //     console.log('Notification 3 triggered');
  //   });
  // };

  $scope.refreshOrders = function () {
    dbService.getAllOrders().then(function(data){
      console.log("received, ", data.result);

      //$scope.orders = data.result.reverse();
      for(var x in data.result) {
        var order = data.result[x];

        var existing = false;
        for(var i in $scope.orders) {
          if($scope.orders[i].ID == order.ID){
            existing = true;
            break;
          }
        }
        if(!existing)
          $scope.orders.push(order);


        existing = false;
        for(var i in $scope.myOrders) {
          if($scope.myOrders[i].ID == order.ID){
            existing = true;
            break;
          }
        }
        if (!existing) {
          if (order.Init === _username) {
            $scope.myOrders.push(order);
          }
          else if (typeof order.Bids !== 'undefined') {
            order.Bids.map(function(bid) {
              if(bid.guestName === _username)
                $scope.myOrders.push(order);
            });
          }
        }

        if($scope.orders)
          $scope.orders.reverse();
        if($scope.myOrders)
          $scope.myOrders.reverse();
      }

      // data.result.map(function(order) {
      //   for(var i in $scope.myOrders) {
      //     if($scope.myOrders[i].ID == order.ID){
      //       console.log('exist');
      //       return;
      //     }
      //   }
      //   if (order.Init === _username) {
      //     $scope.myOrders.push(order);
      //   }
      //   else if (typeof order.Bids !== 'undefined') {
      //     order.Bids.map(function(bid) {
      //       if(bid.guestName === _username)
      //         $scope.myOrders.push(order);
      //     });
      //   }
      // });
    });

    $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
    });  

  };

  $scope.getVendorThumbnail = function (name) {
    return Vendors.getThumbnailByName(name);
  };

  $scope.goToDetail = function (order) {
    $state.go('tab.order-detail', {orderId: order.ID});
  };

  $scope.readyCollect = function (order){
    console.log("nugget");
    //todo: add in-app notification below
  };

  $scope.showLoading(1500);
  $scope.refreshOrders();
    
})

.controller('OrderDetailCtrl', function($scope, $stateParams, $state
  , dbService, $log, localStorageService, $firebaseObject, $ionicPopup, $cordovaLocalNotification, $cordovaBadge, $ionicPlatform) 
{
  /*$ionicPlatform.ready(function () {      
    $cordovaBadge.promptForPermission();
 
        $scope.setBadge = function(value) {
            $cordovaBadge.hasPermission().then(function(result) {
                $cordovaBadge.set(value);
                console.log('Notification Badge triggered');
            }, function(error) {
                alert(error);
            });
        }
    });

    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'YaY!',
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
  };*/



  var ref = new Firebase("https://kopiteh.firebaseio.com/orders");  
  var obj = $firebaseObject(ref);
  var unwatch = obj.$watch(function() {
    $log.debug("data has changed!");
    $scope.refreshData();
    $log.debug('Notification' + '$scope.order.ReadyForCollection');
    if($scope.order.ReadyForCollection == "true")
    {
      $log.debug('setting Notification');
      $scope.setBadge(1);
      $scope.scheduleSingleNotification();
    }

  });

  $scope.order = {};
  $scope.bids = $scope.order.Bids;

  $scope.$on('$ionicView.enter', function(e) {
    $scope.refreshData();
    $scope.refreshData();
  });


  var _username = localStorageService.get("__username");
  $scope.eligible = false;
  $scope.owner = false;

  $scope.refreshData = function() {
    dbService.getOrderdetail($stateParams.orderId)
      .then(function (data) {

        console.log('dbservice, ', data);
        $scope.order = data.result;
        $scope.bids = data.result.Bids;
        $scope.timerString = '';
        console.log(moment($scope.order.ExpriyTime) - moment());

        var updateClock = function() {
          var timeRemaining = moment($scope.order.ExpriyTime) - moment();
          var seconds = timeRemaining / 1000;
          if (seconds <= 0) {
            $scope.eligible = false;
            $scope.timerString = 'Order Expired!';
          } else {
            var minutesLeft = parseInt(seconds % 86400 % 3600 / 60);
            var secondsLeft = parseInt(seconds % 86400 % 3600 % 60);
            $scope.timerString = (minutesLeft < 10 ? '0' + minutesLeft : minutesLeft)
              + ':'
              + (secondsLeft < 10 ? '0' + secondsLeft : secondsLeft)
          }
        }; // end of updateClock
        setInterval(function () { $scope.$apply(updateClock); }, 1000);

        updateClock();

        if($scope.order.Init === _username) { 
          $scope.owner = true;
        }
        else if ($scope.bids && $scope.bids.length <= 3) {
          var localEligible = true;
          for(var i in $scope.bids) {
            if($scope.bids[i].guestName === _username) {
              localEligible = false;
            }
          }
          $scope.eligible = localEligible;
        } else if (!$scope.bids) {
          $scope.eligible = true;
        }
    }); //end of getOrderDetail

  }; 

  console.log($scope.bids);
  $scope.newOrder = '';
  $scope.placeOrder = function(msg) {
    if ('' == msg)
    {
      var alertPopup = $ionicPopup.alert({
        template : 'Order cannot be empty!'
      });
      return;
    }

    var bidParams = [];
    bidParams.push($scope.order.ID);
    bidParams.push($scope.bids ? $scope.bids.length : 0);
    bidParams.push({
      guestName: _username, 
      Message: msg
    });
    console.log("place order,", bidParams);
    dbService.setBids(bidParams);
    setTimeout($scope.refreshData, 500);
  };

  $scope.collect = function() {
    dbService.getOrderdetail($scope.order.ID).then(function(data) {  
      var newState = data.result;
      newState.ReadyForCollection = true;
      dbService.setOrder(["orders/" + $scope.order.ID, newState]);   
    });
  };
})

.controller('AccountCtrl', function($scope,localStorageService, $state) {

  $scope.owner = localStorageService.get('__username');
  $scope.seat = localStorageService.get('__seat');

  // $scope.updateSeat = function(seat){
  //   localStorageService.set('__seat', seat);
  //   $scope.seat = seat;
  // };

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