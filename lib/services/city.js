class City{
	constructor(db){
		this.DB = db;
	}
  
	create(data, callback){
		var query = 'INSERT INTO cities SET name = "'+data.name+'", owner = '+data.owner+', age = 1, x = '+data.x+', y = '+data.y+', realm = '+data.realm;
		this.DB.query(query).then((results) => {
			if(results.insertId){
				cid = results.insertId;
				var query = 'INSERT INTO buildings SET owner = '+data.owner+', city = '+cid+', realm = '+data.realm+', type = 0, level = 1, position = 1';
				this.DB.query(query).then((results) => {
				 var res = {
				  id: cid,
				  name: data.name,
				  owner: data.owner,
				  age: 1,
				  x: data.x,
				  y: data.y,
				  realm: data.realm,
				  buildings: results
				 };
				 callback(res);
				});
			}
		}).catch((err) => {
			console.log(err);
		});
	}
 
	get(owner, realm, callback){
		var query = 'SELECT * FROM cities WHERE owner = '+owner+' AND realm = '+realm;
		this.DB.query(query).then((results) => {
			var data = {
				id: results[0].id,
				name: results[0].name,
				owner: results[0].owner,
				age: results[0].age,
				x: results[0].x,
				y: results[0].y,
				realm: results[0].realm
			};
			callback(data);
		}).catch((err) => {
			console.log(err);
		});
	}
	
	getFieldBuildings(cid, callback){
	 var query = 'SELECT * FROM buildings WHERE city = '+cid+' AND field = 1';
	 this.DB.query(query).then((results) => {
	  var buildings = [];
	  for(var i = 0; i < results.length; i++){
	   var data = {
	    id: results[i].id,
	    type: results[i].type,
	    owner: results[i].owner,
	    city: results[i].city,
	    realm: results[i].realm,
	    level: results[i].level,
	    position: results[i].position,
	   };
	   buildings.push(data);
	  }
	  callback(buildings);
	 });
	}
	
	getCityBuildings(cid, callback){
	 var query = 'SELECT * FROM buildings WHERE city = '+cid+' AND field = 0';
	 this.DB.query(query).then((results) => {
	  var buildings = [];
	  for(var i = 0; i < results.length; i++){
	   var data = {
	    id: results[i].id,
	    type: results[i].type,
	    owner: results[i].owner,
	    city: results[i].city,
	    realm: results[i].realm,
	    level: results[i].level,
	    position: results[i].position,
	   };
	   buildings.push(data);
	  }
	  callback(buildings);
	 });
	}
 
	update(data, callback){
		var query = 'UPDATE cities SET name = "'+data.name+'", age = '+data.age+', x = '+data.x+', y = '+data.y+', realm = '+data.realm+' WHERE id = '+data.id;
		this.DB.query(query).then((result) => {
			callback(result);
		}).catch((err) => {
			console.log(err);
		});
	}
}

module.exports = (db) => {
  return new City(db);
}

