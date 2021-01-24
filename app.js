require('dotenv').config();

const db = require('./lib/db');
var express = require('express');
const fs = require('fs');
const path = require('path');
const async = require('async');

global.express = express;
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var Database = new MySQLStore({
	expiration: 10800000,
	createDatabaseTable: true,
    schema: {
		tableName: 'user_sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
}, db);

global.db = Database;

var globalVars = {
	port: process.env.PORT
};

if(process.env.PRODUCTION){
	globalVars.host = process.env.HOST;
}else{
	globalVars.host = process.env.IP;
}

let hb  = require('express-handlebars');
let bodyParser = require('body-parser');

process.on('uncaughtException', (err) => {
	console.log("Uncaught Exception:", err);
	process.exit(1);
});

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var session = session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true
});

var sharedsession = require("express-socket.io-session");
app.use(session);

io.use(sharedsession(session, {
	autoSave:true
}));

app.use(express.static(__dirname + '/static/'));

handlebars = hb.create({
	extname: '.html',
	defaultLayout: 'game',
	layoutsDir: __dirname+'/views/layouts/',
	partialsDir: __dirname+'/views/partials/',
	helpers: {
		section: (name, options) => {
			if(!this._sections){
				this._sections = {};
			}
			this._sections[name] = options.fn(this);
			return null;
		},
		globalVar: (k) => {
			return globalVars[k];
		},
		iff: (a, operator, b, options) => {
			var bool = false;
			switch (operator) {
				case '==':
					bool = a == b;
				break;
				case '>':
					bool = a > b;
				break;
				case '<':
					bool = a < b;
				break;
				default:
					throw "Unknown operator " + operator;
			}
			
			if (bool) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		}
	}
});
app.engine('html', handlebars.engine); app.set('view engine', 'html');

global.async = async;

var TplController = require('./lib/controllers/tpl');
var UserController = require('./lib/controllers/user');
var PlayerController = require('./lib/controllers/player');
var CityController = require('./lib/controllers/city');
var BuildingController = require('./lib/controllers/building');

const routes = require("./routes");
app.use(routes);

io.on('connection', function(socket){
	console.log('User connected');
	
	TplController.init(socket);
	UserController.init(socket);
	PlayerController.init(socket);
	CityController.init(socket);
	BuildingController.init(socket);
});

server.listen(process.env.PORT, function () {
	console.log('RoC app listening on port '+process.env.PORT);
});


