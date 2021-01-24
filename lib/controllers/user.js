const bcrypt = require('bcrypt');
global.UserService = require("../services/user")(db);
PlayerService = require('../services/player')(db);
CityService = require('../services/city')(db);
Game = require('../game');

module.exports = {init};

function init(socket){
  socket.on('user-login', (data) => {
    UserService.login(data, (result) => {
      if(result.id){
       const buffer = require('crypto').randomBytes(48);
            var token = buffer.toString('hex');
            var expires = 1000 * 60 * 60;
            
            let options = {
              maxAge: expires,
              httpOnly: true,
              signed: true
            };
            global.User = result;
            PlayerService.get(result.id, (data) => {
              global.Player = data;
              CityService.get(global.Player.uid, global.Player.realm, (data) => {
               global.City = data;
               CityService.getCityBuildings(City.id, (data) => {
                global.Buildings = data;
                
                var houseProd = 0,
                 barracksProd = Game.baseProduction.barracks,
                 rangeProd = Game.baseProduction.range,
                 stableProd = Game.baseProduction.stable,
                 alertProd = Game.baseProduction.tower,
                 marketProd = Game.baseProduction.market;
                
                for(var i = 0; i < Buildings.length; i++){
                 var type = Buildings[i].type;
                 switch(type){
                  case 5:
                   houseProd += (Game.buildingBonus.house * Buildings[i].level) + Game.baseProduction.house;
                   break;
                  case 2:
                   barracksProd -= (Game.buildingBonus.barracks * Buildings[i].level);
                   break;
                  case 7:
                   rangeProd -= (Game.buildingBonus.range * Buildings[i].level);
                   break;
                  case 9:
                   stableProd -= (Game.buildingBonus.stable * Buildings[i].level);
                   break;
                  case 11:
                   alertProd +=  Buildings[i].level * 30;
                   break;
                  case 6:
                   marketLvl += Buildings[i].level * Game.buildingBonus.market;
                   break;
                 }
                }
                
                global.Production = {
                 house: houseProd,
                 barracks: barracksProd,
                 range: rangeProd,
                 stable: stableProd,
                 tower: alertProd,
                 market: marketProd
                };
                
                CityService.getFieldBuildings(City.id, (data) => {
                 global.Field = data;
                 
                 var farmProd = Game.baseProduction.farm,
                 lumberProd = Game.baseProduction.lumber,
                 mineProd = Game.baseProduction.mine;
                
                for(var i = 0; i < Buildings.length; i++){
                 var type = Buildings[i].type;
                 switch(type){
                  case 16:
                   lumberProd += (Game.buildingBonus.lumber * Buildings[i].level) + Game.baseProduction.lumber;
                   break;
                  case 15:
                   farmProd += (Game.buildingBonus.farm * Buildings[i].level) + Game.baseProduction.farm;
                   break;
                  case 17:
                   mineProd += (Game.buildingBonus.mine * Buildings[i].level) + Game.baseProduction.mine;
                   break;
                 }
                }
                
                global.Production.lumber = lumberProd;
                global.Production.farm = farmProd;
                global.Production.mine = mineProd;
                
                 socket.emit('login-success', {user: User, player: Player, city: City, token: token});
                });
               });
            });
           });
      }else{
        socket.emit('login-failed', {redirect: "/login/"});
      }
    });
  });
  
  socket.on('user-register', (data) => {
    bcrypt.hash(data.password, 10, function(err, hash) {
      data.hash = hash;
      
      UserService.create(data, function(d){
        PlayerService.create(d, function(data){
          if(data.id && data.uid){
           CityService.create({name: data.name, owner: data.uid, x: 0, y: 0, realm: 1}, (city) => {
            
            socket.emit('register-success', {redirect: "/login/"});
           });
          }
        });
      });
    });
	});
	
  socket.on('user-get', (id) => {
    UserService.get(id, function(result){
      socket.emit('user-get-success', result);
    });
  });
  
  socket.on('user-logout', (data) => {
    socket.emit('logout-success', {redirect: "/"});
  });
	
  socket.on('user-update', (data) => {
    UserService.update(data, function(result){
      socket.emit('user-update-incoming', result);
    });
  });
}