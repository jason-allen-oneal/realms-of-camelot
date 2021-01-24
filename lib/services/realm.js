class Realm{
 constructor(db){
  this.DB = db;
 }
 
 get(r, callback){
  var tiles = [],
   cities = [],
   wilds = [],
   realm = [];
  
  var query = 'SELECT * FROM cities WHERE realm = '+r;
  this.DB.query(query).then((rows) => {
   for(var i = 0; i < rows.length; i++){
    var city = {
     id: rows[i].id,
				name: rows[i].name,
				owner: rows[i].owner,
				x: rows[i].x,
				y: rows[i].y,
				realm: r
			};
			cities.push(city);
		}
		
		var query = 'SELECT * FROM tiles WHERE realm = '+r;
		this.DB.query(query).then((results) => {
		 for(var k = 0; k < results.length; k++){
		  var t_x = results[k].x,
		   t_y = results[k].y;
		  
		  var t = {
		   id: results[k].id,
		   cid: 0,
		   owner: results[k].owner,
		   type: results[k].type,
		   x: t_x,
		   y: t_y
		  };
		  
		  for(var l = 0; l < cities.length; l++){
		   if(cities[l].x == t_x && cities[l].y == t_y){
		    t.type = 7;
		    t.cid = cities[l].id;
		    t.owner = cities[l].owner;
		   }
		  }
		  realm.push(t);
		 }
		 callback(realm);
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
  return new Realm(db);
}

