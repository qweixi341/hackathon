angular.module('starter.services')
.factory('dbService', function($q, $firebaseObject, $log) {

    return {
    	  //get an object from firebase
        getAllOrders: function() 
        {

          $log.debug("We are here");
        	var ref = new Firebase("https://kopiteh.firebaseio.com/orders");  
          var returnObj = $firebaseObject(ref);
          var deferred = $q.defer();
          try {
            ref.on("value", function(snapshot) {
              deferred.resolve({'error':false, 'result': snapshot.val()});
            }, function (errorObject) {
              deferred.resolve({'error':true, 'result': errorObject});
            });
          }
          catch (exc) {
              deferred.resolve({'error':true, 'result': 'exception: ' + exc.toString()});
          }
          return deferred.promise;
        }, 
        getOrderdetail: function(id) 
        {

          $log.debug("We are here");
          var ref = new Firebase("https://kopiteh.firebaseio.com/orders/" + id);  
          var returnObj = $firebaseObject(ref);
          var deferred = $q.defer();
          try {
            ref.on("value", function(snapshot) {
              deferred.resolve({'error':false, 'result': snapshot.val()});
            }, function (errorObject) {
              deferred.resolve({'error':true, 'result': errorObject});
            });
          }
          catch (exc) {
              deferred.resolve({'error':true, 'result': 'exception: ' + exc.toString()});
          }
          return deferred.promise;
        }, 
       //http post request    
       setOrder: function(firebaseParams) 
       {
          var url = firebaseParams[0];
          var params = firebaseParams[1];
          var ref = new Firebase("https://kopiteh.firebaseio.com/" + url);  
          ref.update(params);            
       },
       setBids: function(firebaseParams) 
       {
          $log.debug("We are now setting Bids.");
          var oder_id = firebaseParams[0];
          var bids_id = firebaseParams[1];
          var params = firebaseParams[2];
          var completeURL = "https://kopiteh.firebaseio.com/orders/" + oder_id + "/Bids" + "/" + bids_id;
          $log.debug(completeURL);
          var ref = new Firebase(completeURL);  
          ref.update(params);    
          //$log.debug(returnObj[Bids].length);
       },  
    };
});