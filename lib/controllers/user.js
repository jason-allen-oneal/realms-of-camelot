const bcrypt = require('bcrypt');
global.UserService = require("../services/user")(db);
PlayerService = require('../services/player')(db);
CityService = require('../services/city')(db);

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
              socket.emit('login-success', {user: User, player: Player, city: City, token: token});
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