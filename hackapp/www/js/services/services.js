angular.module('starter.services', ['firebase'])

.factory('Vendors', function() {
  var vendors = [
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
      name: 'Tuck Shop',
      thumbnail: 'img/TuckShop.jpg'
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
      id: 15,
      name: 'One Man Coffee',
      thumbnail: 'img/One Man Coffee.jpg'
    }           
  ];

  vendors.sort(function(a, b){
    var nameA=a.name.toLowerCase();
    var nameB=b.name.toLowerCase();
    if (nameA < nameB) //sort string ascending
      return 1 
    if (nameA > nameB)
      return -1
    return 0 //default return value (no sorting)
    });

  return {
    all: function() {
      return vendors;
    },

    getThumbnailByName(name) {
      for (var i in vendors) {
        if(vendors[i].name === name){
          return vendors[i].thumbnail;
        }
      }
    }
  };
})

.factory('Orders', function(localStorageService, dbService, $log, $firebaseObject) {
  // Might use a resource here that returns a JSON array
  // Below data would be extend after grabbing from Firebase
  // var imageDict = {
  //   yakun     : 'img/YaKun.png',
  //   sumosalad : 'img/sumosalad.jpg',
  //   starbucks : 'img/starbucks.png',
  //   soupspoon : 'img/SoupSpoon.png',
  //   saladstop : 'img/SaladStop.jpg',

  // }
  // if(false)
  // {
  //   dbService.setOrder(["orders/0", {
  //     Init:'Peter', 
  //     Vendor:'YaKun', 
  //     Bids: {
  //       0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
  //       1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
  //       2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
  //       3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
  //     }
  //   }]);
  //   dbService.setOrder(["orders/1", {
  //     Init:'Peter', 
  //     Vendor:'Starbucks', 
  //     Bids: {
  //       0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
  //       1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
  //       2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
  //       3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
  //     }
  //   }]);
  //   dbService.setOrder(["orders/2", {
  //     Init:'Siyuan', 
  //     Vendor:'SoupSpoon', 
  //     Bids: {
  //       0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
  //       1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
  //       2: {guestName:"Weixi", Message:"I would like to have a big cup of Teh-O."},
  //       3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
  //     }
  //   }]);
  //   dbService.setOrder(["orders/3", {
  //     Init:'Mingxia', 
  //     Vendor:'sumosalad', 
  //     Bids: {
  //       0: {guestName:"Ming Xia",   Message:"I want a soda can of Sprite."},
  //       1: {guestName:"Peter Tang", Message:"Can I have a kopi?"},
  //       2: {guestName:"Zhang Jiao", Message:"I would like to have a big cup of Teh-O."},
  //       3: {guestName:"Xie Lekai",  Message:"I am so hungry, can you bring me a sandwich?"},
  //     }
  //   }]);
  // } 
  
  // dbService.setBids(["1",
  //   "1", 
  //   { guestName: "New Bider",
  //     Message: "I want this to work."
  //   }]);
  // var orders = [];
  // var myorders = [];
  // dbService.getAllOrders().then(function(data) {    
  //   //loopObject(data.result);
    
  //   var id = 0;
  //   angular.forEach(data.result, function(value, key) {
  //     var bool_myorder = false;
  //     var _username = localStorageService.get("__username");
  //     if(value.Init !== "")
  //     {
  //       orders.push({ id: id,
  //           name: value.Init, 
  //           lastText: value.Vendor,
  //           face: imageDict[value.Vendor.toLowerCase()]
  //         });
  //     }
  //     //known issue: we assume that each user can only be in one order either as initiator or bider
  //     //todo: below Weixi is hardcoded and should be edited to dynamic value
  //     if(value.Init == _username)
  //     {
  //       bool_myorder=true;
  //     }
  //     else
  //     {
  //       if(typeof(value) == "object"){
  //         angular.forEach(value, function(value, key) {
  //           if(typeof(value) == "object"){
  //             angular.forEach(value, function(value, key) {               
  //               if(value.guestName ==_username)
  //                 bool_myorder=true;
  //                 return false;
  //             });            
  //           }
  //         });
  //       }
  //     }
  //     if(bool_myorder)
  //     {
  //       myorders.push({
  //         id: id,
  //         name: value.Init,
  //         lastText: value.Vendor, 
  //         face: imageDict[value.Vendor.toLowerCase()]
  //       });
  //       //$log.debug(myorders);
  //     }
  //     id = id + 1;
  //   });
  // });

  var myOrders = [];
  var allOrders = [];

  // dbService.getAllOrders().then(function(data){
  //   console.log("received, ", data.result);
  //   allOrders = data.result;

  //   data.result.map(function(order) {
  //     if (order.Init === _username) {
  //       myOrders.push(order);
  //     }
  //     else if (typeof order.Bids !== 'undefined') {
  //       order.Bids.map(function(bid) {
  //         if(bid.guestName === _username)
  //           myOrders.push(order);
  //       });
  //     }
  //   });

  //   console.log("completed, ", allOrders, myOrders);
  });
  

  return {
    all: function() {
      return allOrders;
    },

    get: function(orderId) {
      for (var i in allOrders) {
        if (parseInt(allOrders[i].ID) === parseInt(orderId)) {
          return allOrders[i];
        }
      }
      return null;
    },
    mine: function() {
       return myOrders;
    },
  };
});

