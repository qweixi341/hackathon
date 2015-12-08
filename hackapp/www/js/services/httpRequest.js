angular.module('starter.services')
.factory('httpRequestService', function($q, $http) {
    return {
    	//http get request
        get: function(requestURL) 
        {
        	//validate input params        	
            var deferred = $q.defer();
            var promise = deferred.promise;
 			$http.get(requestURL)
 			.success
 			(
				function(data, status, headers, config)
	 			{
	      		console.log("httpRequest returned success with status " + status + " and data as below -->");
		  			console.log(data);		  		
		  			//alert("httpRequest returned success with status " + status + " and data as below -->");
		            deferred.resolve({returnData:data});		            
			  	}
		  	)
		  	.error
		  	(
		  		function(data, status, headers, config)
		  		{ 
          	console.log("httpRequest returned error with status " + status + " and data as below -->");
		  			console.log(data);            
            if(status.toString()=='0')
            {
              console.log("This is status 0. Probably caused by missing sever certificate.");
            }
		  			//alert("httpRequest returned error with status " + status + " and data as below -->");
		  			deferred.reject("Request Failed with status " + status);
		  		}
		  	);
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
       }, 
       //http post request    
       post: function(requestURL) 
       {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			$http.post(requestURL[0],requestURL[1])
 			.success
 			(
 				function(data, status, headers, config) 
 				{
          			console.log("httpRequest returned success with status " + status + " and data as below -->");
		  			console.log(data);
		  			//alert("httpRequest returned success with status " + status + " and data as below -->");
		            deferred.resolve({returnData:data});
		  		}		  		
		  	)
		  	.error
		  	(
		  		function(data, status, headers, config)
		  		{	  					  			
          	console.log("httpRequest returned error with status " + status + " and data as below -->");
		  			console.log(data);
            if(status.toString()=='0')
            {
              console.log("This is status 0. Probably caused by missing server certificate.");
              deferred.reject({returnData:'0'});
            }
		  			//alert("httpRequest returned error with status " + status + " and data as below -->");
		  			deferred.reject({returnData:data});
		  		}
		  	);
		  	//console.log(promise);
            promise.success = function(fn)
            {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) 
            {
                promise.then(null, fn);
                return promise;
            };
            return promise;
       },  
    };
});