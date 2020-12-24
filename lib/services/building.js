class Building{
	constructor(db){
		this.DB = db;
	}
  
	create(data, callback){
		var query = 'INSERT INTO buildings SET city = "'+data.city+'", owner = '+data.id+', type = '+data.type+', level = '+data.level+', position = '+data.position+', realm = '+data.realm;
		this.DB.query(query).then((results) => {
			if(results.insertId){
				data.id = results.insertId;
				callback(data);
			}
		}).catch((err) => {
			console.log(err);
		});
	}
 
	get(owner, realm, callback){
		var query = 'SELECT * FROM buildings WHERE owner = '+owner+' AND city = '+city;
		this.DB.query(query).then((results) => {
			var data = {
				id: results[0].id,
				city: results[0].city,
				owner: results[0].owner,
				type: results[0].type,
				level: results[0].level,
				position: results[0].position,
				realm: results[0].realm
			};
			callback(data);
		}).catch((err) => {
			console.log(err);
		});
	}
	
	getCityBuildings(id, callback){
		var query = 'SELECT * FROM buildings WHERE city = '+id;
		this.DB.query(query).then((results) => {
			callback(results);
		});
	}
 
	update(data, callback){
		var query = 'UPDATE buildings SET city = "'+data.city+'", owner = '+data.id+', type = '+data.type+', level = '+data.level+', position = '+data.position+', realm = '+data.realm+' WHERE id = '+data.id;
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

