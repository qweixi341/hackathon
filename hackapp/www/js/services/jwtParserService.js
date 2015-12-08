angular.module('starter.services')
.factory('jwtParserService', function scannerServices($q,$log) 
{
	return{
		parseJWTclaim: function(JWTtoken)
		{
			var deferred = $q.defer();
			var promise = deferred.promise;
			if(JWTtoken)
			{
		      	var segments = JWTtoken.split(".");
			   	if (!segments instanceof Array || segments.length !== 3) 
			   	{
			    	deferred.reject("JWTtoken has INVALID format");
			   	}
			   	var claims = segments[1];
			   	decodedObj = JSON.parse(decodeURIComponent(escape(window.atob(claims))));
			   	$log.debug("JWTtoken decoded successful with object below :");
			   	$log.debug(decodedObj);			   	
			   	deferred.resolve(decodedObj);
		   	}
		   	else
		   	{
		   		deferred.reject("JWTtoken NOT set");
		   	}			
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
		}
	};
});