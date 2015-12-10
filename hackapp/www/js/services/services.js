angular.module('starter.services', ['firebase'])

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

<<<<<<< HEAD
.factory('Orders', function(dbService, $log, $firebaseObject) {
  // Might use a resource here that returns a JSON array
  // Below data would be extend after grabbing from Firebase

  //for deployment and firebase, the first would be reserved for user orders
  // Some fake testing data
  function loopObject(obj){
    angular.forEach(obj, function(value, key) {

      $log.debug(key + ': ' + value);
      if(typeof(value)=='object')
      {
        loopObject(value);
      }
    });
  }
  var initSite = true;
  var imageDict = {
    yakun     : 'img/YaKun.png',
    sumosalad : 'img/sumosalad.jpg',
    starbucks : 'img/starbucks.png',
    soupspoon : 'img/SoupSpoon.png',
    saladstop : 'img/SaladStop.jpg',

  }
  if(initSite)
  {
    dbService.setOrder(["orders/0", {
      Init:'Weixi', 
      Vendor:'YaKun', 
      Bids: {
        0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
        1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
        2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
        3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
      }
    }]);
    dbService.setOrder(["orders/1", {
      Init:'Peter', 
      Vendor:'Starbucks', 
      Bids: {
        0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
        1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
        2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
        3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
      }
    }]);
    dbService.setOrder(["orders/2", {
      Init:'Siyuan', 
      Vendor:'SoupSpoon', 
      Bids: {
        0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
        1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
        2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
        3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
      }
    }]);
    dbService.setOrder(["orders/3", {
      Init:'Mingxia', 
      Vendor:'sumosalad', 
      Bids: {
        0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
        1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
        2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
        3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
      }
    }]);
  } 
  
  dbService.setBids(["1" ,"1", {guestName:"New Bider", Message:"I want this to work."}]);
  var orders = [];
  dbService.getAllOrders().then(function(data) {    
    loopObject(data.result);
    
    var id = 0;
    angular.forEach(data.result, function(value, key) {
      if(value.Init!= "")
      {
        orders.push({id:id,name:value.Init,lastText:value.Vendor,face: imageDict[value.Vendor.toLowerCase()]})        
      }
      id = id + 1;
    });
  });
 

  // var orders = [{
  //   id: 0,
  //   name: 'This is username',
  //   lastText: 'Current bids: 4',
  //   face: 'img/YaKun.png'
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'img/sumosalad.jpg'
  // }, {
  //   id: 2,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'img/starbucks.png'
  // }, {
  //   id: 4,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'img/SoupSpoon.png'
  // }, {
  //   id: 5,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'img/SaladStop.jpg'
  // }];

  return {
    all: function() {
      return orders;
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

