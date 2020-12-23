class User {
	constructor(db){
		this.DB = db;
	}
	
	create(name, email, hash, callback){
		var query = 'INSERT INTO users SET email = "'+email+'", name = "'+name+'", pass = "'+hash+'", chat = 0';
		this.DB.query(query).then((results) => {
			this.id = results.insertId;
			this.name = name;
			callback(this);
		}).catch((err) => {
			console.log(err);
		});
	}
	
	get(id, callback){
		var query = 'SELECT * FROM users WHERE id = '.id;
		this.DB.query(query).then((results) => {
			this.id = results[0].id;
			this.name = results[0].name;
			this.hasChar = results[0].has_char;
			this.firstRun = results[0].first_run;
			this.chat = results[0].chat;
			
			callback(this);
		}).catch((err) => {
			console.log(err);
		});
	}
	
	update(data, callback){
		var query = 'UPDATE users SET name = "'+data.name+'", has_char = "'+data.hasChar+'", first_run = "'+data.firstRun+'" WHERE id = '+data.id;
		this.DB.query(query).then((results) => {
			callback(JSON.parse(JSON.stringify(results)));
		}).catch((err) => {
			console.log(err);
		});
	}
}

module.exports = (db) => {
    return new User(db);
}


