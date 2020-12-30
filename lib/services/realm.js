class Building{
 constructor(db){
  this.DB = db;
 }
 
 get(realm, callback){
  var tiles = [];
  var query = 'SELECT * FROM cities WHERE realm = '+realm;
  this.DB.query(query).then((result) => {
   var cities = [];
   for(var i = 0; i < result.length; i++){
    var data = {
				id: result[i].id,
				name: result[i].name,
				owner: result[i].owner,
				x: result[i].x,
				y: result[i].y,
			};
			cities.push(data);
   }
   
   var query = 'SELECT * FROM tiles WHERE realm = '+realm;
   this.DB.query(query).then((results) => {
    for(var j = 0; j < results.length; j++){
     var t_x = result[j].x,
      t_y = result[j].y;
     
     var t ={
      id: result[j].id,
      cid: 0,
      owner: 0,
      type: result[j].type,
      x: t_x,
      y: t_y
     };
     
     var query = 'SELECT * FROM wilds WHERE realm = '+realm+' SORT BY x asc, y asc';
     this.DB.query(query).then((res) => {
      for(var l = 0; l < res.length; l++){
       if(res[l].x == t_x && res[l].y == t_y){
        t.owner = res[l].owner;
       }
      }
      
      for(var k=0; k<cities.length; k++){
       if(cities[k].x == t_x && cities[k].y == t_y){
        t.type = 7;
        t.cid = cities[k].id;
        t.owner = cities[k].owner;
       }
      }
      
      tiles.push(t);
     }).catch((err) => {
      console.log(err);
     });
    }
    callback(tiles);
   }).catch((err) => {
    console.log(err);
   });
  }).catch((err) => {
   console.log(err);
  });
 
 
 
 
  
   var tiles = [];
   
    var data = {
     id: results[i].id,
     owner: results[i].owner,
     type: results[i].type,
     level: results[i].level,
     x: results[i].x,
     y: results[i].y,
     realm: results[i].realm
    };
    
    tiles.push(data);
   }
   
   
    for(var j = 0; j < result.length; j++){
     
     
     
      
     }
    }
    //callback(tiles);
   }).catch((err) => {
    console.log(err);
   });
  }).catch((err) => {
   console.log(err);
  });
 }
 
	updateTile(data, callback){
		var query = 'UPDATE tiles SET x = "'+data.x+'", owner = '+data.owner+', type = '+data.type+', level = '+data.level+', y = '+data.y+', realm = '+data.realm+' WHERE id = '+data.id;
		this.DB.query(query).then((result) => {
			callback(result);
		}).catch((err) => {
			console.log(err);
		});
	}
}

module.exports = (db) => {
  return new Building(db);
}

