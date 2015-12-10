angular.module('starter.services')
.factory('dbService', function($q, $firebaseObject, $log) {

    return {
  	  //get an object from firebase
      getAllOrders: function() 
      {
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
      getAllOrdersID: function() 
      {
        var ref = new Firebase("https://kopiteh.firebaseio.com/orders");  
        var returnObj = $firebaseObject(ref);
        var deferred = $q.defer();
        try {
          ref.on("value", function(snapshot) {
            var returnID = snapshot.val()[snapshot.val().length-1].ID + 1;
            deferred.resolve({'error':false, 'result': returnID});
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
      var oder_id = firebaseParams[0];
      var bids_id = firebaseParams[1];
      var params = firebaseParams[2];
      var completeURL = "https://kopiteh.firebaseio.com/orders/" + oder_id + "/Bids" + "/" + bids_id;
      var ref = new Firebase(completeURL);  
      ref.update(params);    
      //$log.debug(returnObj[Bids].length);
    }  
  };
});