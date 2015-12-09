angular.module('starter.services', [])

.factory('Vendors', function() {
  var vendors = [
    {
      id: 0,
      name: 'SaladStop',
      thumbnail: 'img/SaladStop.jpg'
    },
    {
      id: 1,
      name: 'Starbucks',
      thumbnail: 'img/starbucks.png'
    },
    {
      id: 2,
      name: 'Ya Kun 亚坤',
      thumbnail: 'img/YaKun.png'
    },
    {
      id: 3,
      name: 'The Soup Spoon',
      thumbnail: 'img/SoupSpoon.png'
    },    
    {
      id: 4,
      name: 'Sumo Salad',
      thumbnail: 'img/sumosalad.jpg'
    }   

  ];
  return {
    all: function() {
      return vendors;
    }
  };
})

.factory('Orders', function($firebase) {

  var endPoint = "https://kopiteh.firebaseio.com/";
  var ref = new FireBase(endPoint);
  var orders = $firebase(ref.child('orders')).$asArray();

  return {
    all: orders,
    
    create: function (order) {
      return orders.$add(order);
    },

    get: function (orderId) {
      return $firebase(ref.child('orders').child(orderId)).$asObject();
    },

    delete: function (orderId) {
      return orders.$remove(orderId);
    }
  };

})

.factory('Orders', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var orders = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return orders;
    },
    remove: function(order) {
      orders.splice(orders.indexOf(order), 1);
    },
    get: function(orderId) {
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].id === parseInt(orderId)) {
          return orders[i];
        }
      }
      return null;
    }
  };
});
