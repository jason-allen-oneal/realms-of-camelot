class Tpl{
 constructor(db){
  this.DB = db;
  this.view = 'city';
  this.mapLoaded = false;
 }
 
 create(callback){
  var tiles = [];
  var struct = {
   0: 0.1, // moor
   1: 0.3, // plain
   2: 0.15, // grassland
   3: 0.15, // lake
   4: 0.15, // hill
   5: 0.15 // mountain
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
    
    var query = 'INSERT INTO tiles SET realm = 1, x = '+x+', y = '+y+', type = '+tile+', owner = 0, level = 1';
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

