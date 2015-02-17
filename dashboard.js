var express = require('express');
var handlebars = require('express-handlebars');

var mongo = require('mongodb');
var monk = require('monk');

var qs = require('querystring');
var credentials = require('./credentials.js');
//Create Database Object using Monk
var db = monk('localhost:27017/mUnivDatabase');

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

//for database
app.use(function(req, res, next) {
	req.db = db;
	next();
});
// include bodyParser
app.use(express.bodyParser());
//cookies Secret
app.use(require('cookie-parser')(credentials.cookieSecret));
//session
app.use(require('express-session')());

app.use(function(req, res, next){
// if there's a flash message, transfer
// it to the context, then clear it
res.locals.flash = req.session.flash;
delete req.session.flash;
next();
});
//basic routes
app.get('/', function(req, res){
	res.redirect('login');
	console.log("empty response");
});

app.get('/login', function(req,res){

	if(req.param("release") == "true"){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}
			else
			{
				res.redirect('/login');
			}
		});
	}
	else{
		sess=req.session;
		if(sess.email){	

			res.redirect('/dashboard');
		}
		else{
			res.cookie('signed_monster', 'nom nom', { signed: true });
			res.render('login', {title : 'Login to Dashboard'});
			console.log("inside login get");
			var signedMonster = req.signedCookies.monster;
			console.log("Signed Moster"+signedMonster);
		}
	}
	
});
app.post('/login', function(req,res){


	var name = req.body.email +" "+ req.body.password;
	console.log("name: "+name);
	var info = [];

	var emailpassword = {"email" : req.body.email, "password" : req.body.password};
	
	info.push(emailpassword);
	
	//console.log(req);
	db_api.loginuser(db, res, req, info, function(res, req, data){
		if(data==true)
		{
			console.log("create session");
			sess=req.session;
			//In this we are assigning email to sess.email variable.
			//email comes from HTML page.
			sess.email=req.body.email;

			res.redirect('/dashboard');
		}	
	});
	//res.redirect('dashboard');
});


app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});
app.get('/dashboard', function(req, res) {
	sess=req.session;
	if(!sess.email){	
		res.redirect('/login');
	}
	else{
		res.render('dashboard', {title: "mUniv Dashboard",email:sess.email});
	}
	
});
app.post('/un', function(req, res) {
	db_api.countusers(db, res);
});
app.post('/in', function(req, res) {
	db_api.countinstitutes(db, res);
});
app.get('/registerNewInst', function(req,res){
	sess=req.session;
	if(!sess.email){	
		res.redirect('/login');
	}
	else{
		res.render('instfeatureswizard', {title: "Register New App",email:sess.email});
	}
	
});
app.post('/registerNewInst',function(req,res){
	//console.log(req);

	var name = req.body.instName;
	console.log(name);
	console.log(req.body.instName);
	console.log(req.body.instCode);
	console.log(req.body.gAcademicInfo);
	var features=[{"instituteInfo":{"instName":req.body.instName,"instCode":req.body.instCode},
	"guestFeatures":{"academicInfo":req.body.gAcademicInfo,"athletics":req.body.gAthletics,"universityEvent":req.body.gUniversityEvent,"generalUniversityInfo":req.body.gGeneralUniversityInfo,"searchCourses":req.body.gSearchCourses,"campusMap":req.body.gCampusMap,"socialMedia":req.body.gSocialMedia,"admissionInfo":req.body.gAdmissionInfo,requestForInfo:req.body.gRequestForInfo},
	"studentFeatures":{"viewClassSchedule":req.body.sViewClassSchedule,"viewEmail":req.body.sViewEmail,"enrollAddDropSwap":req.body.sEnrollAddDropSwap,"viewHolds":req.body.sViewHolds,"viewToDos":req.body.sViewToDos,"viewCommunication":req.body.sViewCommunication,"viewPayBill":req.body.sViewPayBill,"acceptDeclineFinancialAid":req.body.sAcceptDeclineFinancialAid,"updateBio":req.body.sUpdateBio,"viewGrade":req.body.sViewGrade,"applyGraduation":req.body.sApplyGraduation,"officialTranscript":req.body.sOfficialTranscript,"enrollmentVerification":req.body.sEnrollmentVerification,"examSchedule":req.body.sExamSchedule},
	"facultyFeatures":{"teachingSchedule":req.body.fTeachingSchedule,"classRoster":req.body.fClassRoster,"gradeRoster":req.body.fGradeRoster,"gradeToAllStudents":req.body.fGradeToAllStudents,"examSchedule":req.body.fExamSchedule},
	"alumniFeatures":{"makeDonation":req.body.amakeDonation,"alumniEventCalender":req.body.aAlumniEventCalender,"updatePersonalInformation":req.body.aUpdatePersonalInformation},
	"employeeFeatures":{"myPayCheck":req.body.eMyPayCheck},
	"otherFeatures":{"admissionControlCenter":req.body.oAdmissionControlCenter,"authenticationSetup":req.body.oAuthenticationSetup}
	}];
	console.log(features);
	db_api.insertinstitutedata(db, res, req, info, function(res, req, data){
		if(data)
		{
			console.log("data inserted");
			res.redirect('/dashboard');
		}
		else
		{
			console.log("data not inserted");
			res.redirect('/registerNewInst');	
		}	
	});
});
app.get('/editSettings', function(req,res){

	sess=req.session;
	if(!sess.email){	
		res.redirect('/login');
	}
	else
	{
		var q_str = req.url.split('?')[1];
		console.log(qs.parse(q_str));
		if(q_str)
			res.render('editfeatureswizard', {title: "Edit Features", email:sess.email}); 
		else
			res.render('editsettings', {title: "Edit App Settings",email:sess.email});
	}
});
app.post('/ic', function(req, res) {
	db_api.getallinstitutes(db, res);
});

app.post('/es', function(req, res) {
	var q_str = qs.parse(req.url.split('?')[1]);
	db_api.getdatainstitute(req.db, res, q_str.i);	
});
app.post('/fl', function(req, res){
	var q_str = qs.parse(req.url.split('?')[1]);
	console.log(q_str);

	if(!(q_str.i && q_str.k && q_str.s))
		res.send({success:false, data:"Authentication Failed"});
	else
		db_api.getdatainstituteks(req.db, res, q_str);
});
app.get('/uploadData', function(req,res){
	sess=req.session;
	if(!sess.email){	
		res.redirect('/login');
	}
	else{
		res.render('uploaddata', {title: "Upload Data",email:sess.email});
	}

	
});
app.get('/users', function(req,res){
	sess=req.session;
	if(!sess.email){	
		res.redirect('/login');
	}
	else{
		res.render('users', {title: "Manage Users",email:sess.email});
	}
	
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
	sess=req.session;
	if(!sess.email){	
		res.redirect('/login');
	}
	else{
		var all_options = options.getOptions();
		res.render('users', {title: "Manage Users",email:sess.email});
		res.render('options', { options: all_options } );
	}
	
	
	/*
	for(var i = 0; i < all_options.length; i++) {
		console.log(all_options[i]);
	}*/
	
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


