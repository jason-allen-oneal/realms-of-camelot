class Tpl{
 constructor(db){
  this.DB = db;
  this.view = 'city';
  this.mapLoaded = false;
 }
  
 city(id, realm, callback){
  var query = 'SELECT * FROM cities WHERE owner = '+id+' AND realm = '+realm;
  this.DB.query(query).then((results) => {
   var city = results[0];
   var query = 'SELECT * FROM buildings WHERE owner = '+id+' AND city = '+city.id+' AND realm = '+realm;
   this.DB.query(query).then((results) => {
    city.buildings = results;
    callback(city);
   }).catch((err) => {
    console.log(err);
   });
  }).catch((err) => {
   console.log(err);
  });
 }
 
 fields(callback){
  
 }
 
 map(callback){
  
 }
 
 create(callback){
  var tiles = [];
  var struct = {
   0: 0.15,
   1: 0.2,
   2: 0.15,
   3: 0.15,
   4: 0.1,
   5: 0.1,
   6: 0.15,
  };
  
  function defineTile(spec){
   var i, sum=0, r=Math.random();
   for(i in spec){
    sum += spec[i];
    if (r <= sum) return i;
   }
  }
  
  var createMap = (m, n) => [...Array(m)].map(e => Array(n).fill(0));
  var grid = createMap(750, 750);
  for(var x = 0; x < grid.length; x++){
   for(var y = 0; y < grid[x].length; y++){
    var tile = defineTile(struct);
    
    var query = 'INSERT INTO tiles SET realm = 1, x = '+x+', y = '+y+', type = '+tile+', owner = 0';
    this.DB.query(query).then((results) => {
      if(results.length){
       console.log('continue');
      }
    }).catch((err) => {
     console.log(err);
    });
   }
  }
  this.mapLoaded = true;
 }
}

module.exports = (db) => {
  return new Tpl(db);
}

