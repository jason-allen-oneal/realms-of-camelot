class City{
	constructor(db){
		this.DB = db;
	}
  
	create(data, callback){
		var query = 'INSERT INTO cities SET name = "'+data.name+'", owner = '+data.id+', age = '+data.age+', x = '+data.x+', y = '+data.y+', realm = '+data.realm;
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

