RoC.controllers = {
 User: {
  init: () => {
   Socket.on("login-success", (data) => {
    setCookie('uid', data.user.id, 365);
    setCookie('token', data.token, 1);
	    
	   window.location = "http://"+RoC.host+"/game";
	  });
	   
	  Socket.on("login-failed", (data) => {
	   window.location = "http://"+RoC.host+data.redirect;
	  });
	   
	  Socket.on("register-success", (data) => {
	   window.location = "http://"+RoC.host+data.redirect;
	  });
	   
	  Socket.on("logout-success", (data) => {
	   window.location = "http://"+RoC.host;
	  });
	 },
	},
	Player: {
	 init: () => {
	  Socket.on("player-get-success", (data) => {
	   RoC.models.Player.id = data.id;
	   RoC.models.Player.pid = data.pid;
	   RoC.models.Player.name = data.name;
	   RoC.models.Player.gender = data.gender;
	   RoC.models.Player.avatar = data.avatar;
	   RoC.models.Player.chat = data.chat;
	   RoC.models.Player.power = data.power;
	   RoC.models.Player.realm = data.realm;
	   RoC.models.Player.food = data.food;
	   RoC.models.Player.wood = data.wood;
	   RoC.models.Player.stone = data.stone;
	   RoC.models.Player.ore = data.ore;
	   RoC.models.Player.gold = data.gold;
	   RoC.models.Player.platinum = data.platinum;
	  });
	  
	  Socket.on('player-update-incoming', (data) => {
	   RoC.models.Player.id = data.id;
	   RoC.models.Player.pid = data.pid;
	   RoC.models.Player.name = data.name;
	   RoC.models.Player.gender = data.gender;
	   RoC.models.Player.avatar = data.avatar;
	   RoC.models.Player.chat = data.chat;
	   RoC.models.Player.power = data.power;
	   RoC.models.Player.realm = data.realm;
	   RoC.models.Player.food = data.food;
	   RoC.models.Player.wood = data.wood;
	   RoC.models.Player.stone = data.stone;
	   RoC.models.Player.ore = data.ore;
	   RoC.models.Player.gold = data.gold;
	   RoC.models.Player.platinum = data.platinum;
	  });
	 }
 },
 City: {
  init: () => {
   Socket.on("city-get-results", (data) => {
    RoC.models.City.id = data.id;
    RoC.models.City.name = data.name;
    RoC.models.City.owner = data.owner;
    RoC.models.City.age = data.age;
    RoC.models.City.x = data.x;
    RoC.models.City.y = data.y;
    RoC.models.City.realm = data.realm;
    
    Socket.emit('city-get-buildings', RoC.models.City.id);
   });
   
   Socket.on("city-get-buildings-results", (data) => {
    RoC.models.City.buildings = data;
    RoC.Tpl.buildCity();
   });
  }
 },
};