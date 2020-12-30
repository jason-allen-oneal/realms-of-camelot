RealmService = require('../services/realm')(db);

module.exports = {init};

function init(socket){
 socket.on('realm-get', (id) => {
  RealmService.get(id, (result) => {
   socket.emit('realm-get-results', result);
  });
 });
}