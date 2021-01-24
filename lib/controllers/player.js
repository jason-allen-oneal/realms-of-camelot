PlayerService = require('../services/player')(db);

module.exports = {init};

function init(socket){
 socket.on('player-get', (id) => {
  PlayerService.get(id, function(result){
   socket.emit('player-get-success', result);
  });
 });
 
 socket.on('player-update', (data) => {
  PlayerService.update(data, function(result){
   socket.emit('player-update-incoming', result);
  });
 });
}