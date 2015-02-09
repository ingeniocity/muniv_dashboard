var express = require('express');
var handlebars = require('express-handlebars');

var mongo = require('mongodb');
var monk = require('monk');

var qs = require('querystring');

//Create Database Object using Monk
var db = monk('localhost:27017/mUnivDashboard');

var db_api = require('./lib/dbApi.js');

var app = express();

//Creating Handlebars Instance and configuring it
var ehbs = handlebars.create({
	defaultLayout :'main',
    	helpers: {
		'compare' : function (lvalue, operator, rvalue, options) {
			var operators, result;
			
			if (arguments.length < 3) {
				throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
			}
		
			if (options === undefined) {
				options = rvalue;
				rvalue = operator;
				operator = "===";
			}
		    
			operators = {
				'==': function (l, r) { return l == r; },
				'===': function (l, r) { return l === r; },
				'!=': function (l, r) { return l != r; },
				'!==': function (l, r) { return l !== r; },
				'<': function (l, r) { return l < r; },
				'>': function (l, r) { return l > r; },
				'<=': function (l, r) { return l <= r; },
				'>=': function (l, r) { return l >= r; },
				'typeof': function (l, r) { return typeof l == r; }
			};
		    
			if (!operators[operator]) {
				throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
			}
		    
			result = operators[operator](lvalue, rvalue);
		
		    	if (result) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		
		},
		'section' : function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});


app.engine('handlebars', ehbs.engine);
app.set('view engine', 'handlebars');

// require services

var options = require('./lib/options.js');

console.log(ehbs);

app.set('port', process.env.PORT || 3000);

//Production or Test Version query string
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
	next();
});

//
app.use(function(req, res, next) {
	req.db = db;
	next();
});

//basic routes
app.get('/', function(req, res){
	res.redirect('login');
});

app.get('/login', function(req,res){
	res.render('login', {title : 'Login to Dashboard'});
});
app.post('/login', function(req,res){
	console.log(req);
	res.redirect('dashboard');
});
app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});
app.get('/dashboard', function(req, res) {
	res.render('dashboard', {title: "mUniv Dashboard"});
});
app.post('/un', function(req, res) {
	db_api.countusers(db, res);
});
app.post('/in', function(req, res) {
	db_api.countinstitutes(db, res);
});
app.get('/registerNewInst', function(req,res){
	res.render('instfeatureswizard', {title: "Register New App"});
});
app.get('/editSettings', function(req,res){
	var q_str = req.url.split('?')[1];
	if(q_str)
		res.render('editfeatureswizard', {title: "Edit Features"}); 
	else
		res.render('editsettings', {title: "Edit App Settings"});
});
app.get('/es', function(req, res) {
	var q_str = qs.parse(req.url.split('?')[1]);
	
});
app.post('/fl', function(req, res){
	var q_str = qs.parse(req.url.split('?')[1]);
	
	console.log(q_str.i);
	db_api.returnfeaturesforapp(req.db, q_str);
});
app.get('/uploadData', function(req,res){
	res.render('uploaddata', {title: "Upload Data"});
});
app.get('/users', function(req,res){
	res.render('users', {title: "Manage Users"});
});
app.post('/u', function(req, res){
	//console.log("POST REQUEST USERS");
	//var q_str = qs.parse(req.url.split('?')[1]);
	var q_str = req.url.split('?')[1];
	if(q_str)
		console.log(q_str);	
	else
		db_api.getallusers(db, res);	
	
	//var collection = req.db.get('User_Config');
	//collection.find({},{}, function(e, docs) {
	//	if(!docs)
	//		res.send(e);

		//console.log(docs);
		//console.log({"success":true, "data" : docs});
	//	res.send({"success":true, "data" : docs});
	//});
});
app.get('/options', function(req,res){
	
	var all_options = options.getOptions();
	/*
	for(var i = 0; i < all_options.length; i++) {
		console.log(all_options[i]);
	}*/
	res.render('options', { options: all_options } );
});



//Static Content
app.use(express.static(__dirname + '/public'));

// custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


//Custom code


app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' 
		+ app.get('port') + '; press Ctrl-C to terminate.' );
});


