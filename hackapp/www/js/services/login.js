angular.module('starter.services')
.factory
(
	'loginService', function(httpRequestService, localStorageService, $ionicPopup, $state) 
	{
	    return{
	        loginUser: function(name, pw)
	        {
	        	//httpRequestService.get("https://sgsinecspdlib.ecs.ads.autodesk.com/API/public/loginv2?username=" + name + "&password=" + pw)
	            httpRequestService.post(['https://sgsinecspdlib.ecs.ads.autodesk.com/API/public/loginv2', {username:name,password:pw}])
	            .success(function(data)
	            {   
	            	console.log(data);
	            	localStorageService.set('__username', data.returnData.displayName);
		    		localStorageService.set('__JWT', data.returnData.JWT);		
	            	$state.go('tab.orders');
	        	})
	        	.error(function(data)
	        	{
					console.log('data');
	        		console.log(data.returnData.reason);
	        		if(data.returnData == '0')
	        		{
	        			var alertPopup = $ionicPopup.alert
			            ({
			                title: 'Server Communication Error',
			                template: 'Please make sure site_certificate are installed.'
		            	});
	        		}
	        		else
	        		{
	        			var alertPopup = $ionicPopup.alert
			            ({
			                title: 'LOGIN FAILED!',
			                template: 'Please check your credentials!'
		            	});
	        		}
		            
	        	});
	       }       
	    };
	}
);
