const mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    timeout         : 60 * 60 * 1000,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_DB
});

var Database = function(){};

Database.prototype.query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, results) => {
            if (error){
                return reject(error);
            }else{
                resolve(results);
            }
        });
    });
};

Database.prototype.close = () => {
	return new Promise((resolve, reject) => {
		pool.end(err => {
			if(err)
				return reject(err);
			resolve();
		});
	});
};

module.exports = new Database();