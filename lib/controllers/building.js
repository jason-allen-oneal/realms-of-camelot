BuildingService = require('../services/building')(db);

module.exports = {init};

function init(socket){
  socket.on('building-get', (id) => {
    BuildingService.get(id, function(result){
      socket.emit('building-get-results', result);
    });
  });
	
  socket.on('building-update', (data) => {
    BuildingService.update(data, function(result){
      socket.emit('building-update-incoming', result);
    });
  });
}