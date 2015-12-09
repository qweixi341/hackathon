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
      name: 'apples&oranges',
      thumbnail: 'img/apples&oranges.jpg'
    }, 
    {
      id: 6,
      name: 'bakersfield',
      thumbnail: 'img/bakersfield.jpg'
    },
    {
      id: 7,
      name: 'bread yard',
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

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
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
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
