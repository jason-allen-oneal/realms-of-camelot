class Player{
 constructor(db){
  this.DB = db;
 }
  
 create(data, callback){
  var g;
  if(data.gender == 0){
   g = 'male';
  }else{
   g = 'female';
  }
    
  var query = 'INSERT INTO players SET pid = '+data.pid+', name = "'+data.name+'", chat = 0, gender = "'+g+'", avatar = '+data.avatar;
  this.DB.query(query).then((results) => {
   if(results.insertId){
    data.id = results.insertId;
    callback(data);
   };
  }).catch((err) => {
   console.log(err);
  });
 }
 
 get(pid, callback){
  var query = 'SELECT * FROM players WHERE pid = '+pid;
  this.DB.query(query).then((results) => {
   var data = {
    pid: pid,
    name: results[0].name,
    chat: results[0].chat,
    gender: results[0].gender,
    avatar: results[0].avatar,
    power: results[0].power,
    realm: results[0].realm,
    food: results[0].food,
    wood: results[0].wood,
    stone: results[0].stone,
    ore: results[0].ore,
    gold: results[0].gold,
    platinum: results[0].platinum
   };
   callback(data);
  }).catch((err) => {
   console.log(err);
  });
 }
 
 update(data, callback){
  var query = 'UPDATE players SET name = "'+data.name+'", gender = '+data.gender+', chat = '+data.chat+', avatar = "'+data.avatar+'", power = '+data.power+', food = "'+data.food+'", wood = "'+data.wood+'", stone = "'+data.stone+'", ore = "'+data.ore+'", gold = "'+data.gold+'", platinum = "'+data.platinum+'" WHERE pid = '+data.pid;
  this.DB.query(query).then((result) => {
   callback(result);
  }).catch((err) => {
   console.log(err);
  });
 }
}

module.exports = (db) => {
  return new Player(db);
}

