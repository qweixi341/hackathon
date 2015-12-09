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
  // Below data would be extend after grabbing from Firebase

  //for deployment and firebase, the first would be reserved for user orders
  // Some fake testing data
  var orders = [{
    id: 0,
    name: 'This is username',
    lastText: 'Current bids: 4',
    face: 'img/YaKun.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/sumosalad.jpg'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/starbucks.png'
  }, {
    id: 4,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/SoupSpoon.png'
  }, {
    id: 5,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/SaladStop.jpg'
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
