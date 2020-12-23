const bcrypt = require('bcrypt');

class User{
  constructor(db){
    this.DB = db;
  }
  
  create(data, callback){
    var error;
    // check if email and/or name exists in database
    var query = 'SELECT id FROM users WHERE email = "'+data.email+'"';
    this.DB.query(query).then((result) => {
      if(Array.isArray(result) && result.length){
        error = 'Already Registered.';
      }else{
        var query = 'INSERT INTO users SET email = "'+data.email+'", pass = "'+data.hash+'"';
        this.DB.query(query).then((results) => {
          if(results.insertId){
            data.pid = results.insertId;
            callback(data);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  login(data, callback){
    var query = 'SELECT * FROM users WHERE email = "'+data.email+'"';
    db.query(query).then((results) => {
      if(results.length){
        bcrypt.compare(data.password, results[0].pass, function(err, result){
          if(err){
            callback(err);
          }else{
            if(result){
              data.id = results[0].id;
              callback(data);
            }else{
              callback("Incorrect username/password");
            }
            callback(result);
          }
        });
      }
    }).catch((err) => {
      console.log(err);
      callback(true);
    });
  }
  
  get(id, callback){
    var query = 'SELECT * FROM users WHERE id = '.id;
    this.DB.query(query).then((results) => {
      var data = {
        id: results[0].id,
        email: results[0].email
      };
      
      callback(this);
    }).catch((err) => {
      console.log(err);
    });
  }
  
  update(data, callback){
    bcrypt.hash(data.password, 10, function(err, hash) {
      var query = 'UPDATE users SET email = "'+data.email+'", pass = '+hash+' WHERE id = '+data.id;
      this.DB.query(query).then((results) => {
        callback(results);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}

module.exports = (db) => {
  return new User(db);
}