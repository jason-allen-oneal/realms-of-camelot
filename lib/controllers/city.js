CityService = require('../services/city')(db);
BuildingService = require('../services/building')(db);

module.exports = {init};

function init(socket){
  socket.on('city-get', (id) => {
    CityService.get(id, function(result){
      socket.emit('city-get-results', result);
    });
  });
  
  socket.on('city-get-buildings', (id) => {
	BuildingService.getCityBuildings(id, function(result){
		socket.emit('city-get-buildings-results', result);
	});
  });
	
  socket.on('city-update', (data) => {
    CityService.update(data, function(result){
      socket.emit('city-update-incoming', result);
    });
  });
}