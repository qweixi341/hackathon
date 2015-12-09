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
    },
    {
      id: 5,
      name: 'Apples&oranges',
      thumbnail: 'img/apples&oranges.jpg'
    }, 
    {
      id: 6,
      name: 'Bakersfield',
      thumbnail: 'img/bakersfield.jpg'
    },
    {
      id: 7,
      name: 'Bread yard',
      thumbnail: 'img/bread yard.jpg'
    },
    {
      id: 8,
      name: 'Chillas',
      thumbnail: 'img/Chillas.jpg'
    },
    {
      id: 9,
      name: 'Coffee Hive',
      thumbnail: 'img/Coffee Hive.jpg'
    },               
    {
      id: 10,
      name: 'Coffee&Toast',
      thumbnail: 'img/Coffee&Toast.jpg'
    },
    {
      id: 11,
      name: 'D Pastriez',
      thumbnail: 'img/D Pastriez.jpg'
    }, 
    {
      id: 12,
      name: 'Green Croft',
      thumbnail: 'img/Green Croft.jpg'
    },
    {
      id: 13,
      name: 'Kettle Pot',
      thumbnail: 'img/Kettle Pot.jpg'
    },
    {
      id: 14,
      name: 'Mixed Grill',
      thumbnail: 'img/Mixed Grill.jpg'
    },
    {
      id: 15,
      name: 'One Man Coffee',
      thumbnail: 'img/One Man Coffee.jpg'
    },
    {
      id: 16,
      name: 'PitaPit',
      thumbnail: 'img/PitaPit.jpg'
    },
    {
      id: 17,
      name: 'The Daily Cut',
      thumbnail: 'img/The Daily Cut.jpg'
    },             
  ];

  vendors.sort(function(a, b){
    var nameA=a.name.toLowerCase();
    var nameB=b.name.toLowerCase();
    if (nameA < nameB) //sort string ascending
      return -1 
    if (nameA > nameB)
      return 1
    return 0 //default return value (no sorting)
    });

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
