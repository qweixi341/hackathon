angular.module('starter.services')
.factory('localStorageService', function($window, $log) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
});



/***
 *.Calling method
 * 
-->Single variable
localStorageService.set('__JWT', data.returnData.JWT);
console.log(localStorageService.get('__JWT'));

-->Object
localStorageService.setObject('post', {
	name: 'Thoughts',
	text: 'Today was a good day'
});  
var post = localStorageService.getObject('post');
console.log(post); 
 */