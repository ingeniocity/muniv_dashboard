// We have three collections Institute_Features,Institute_Configuration,User_Configuration




//var db=req.db;

//var mongo=require('mongodb');
//var monk=require('monk');
//var db=monk('localhost:27017/mUnivDashboard');
/*exports.insertdata=function(db, f)
{

	var collection=db.get('user1');
	console.log("database object is"+db);
	console.log("data is");
	var p;
	//var password=123;
	//var recordCount=collection.find({password:"315"},{}).count();
	//console.log("total")
	//console.log("total records are"+recordCount);
	//console.log(collection.find({},{}).pretty());*/
	/*collection.find({},{},function(e,docs){
		console.log('data fetched is'+docs);
	});
	console.log("collection of database"+collection);
	console.log("parameter is"+f);
	collection.insert({
		name:f[0].name,
		password:f[0].password,
		//gUniversityEvent:features[0].tags.f,
		//gGeneralUniversityInfo:features[0].tags.s
	},function(e,docs){
	console.log("data is "+docs.name+"  "+docs.password);
	console.log("error is "+e);
	p=e;
	console.log("p is "+p);
	return(p);
//}).then(function(){console.log("after then")});
	}).then(function(db,f){
		console.log("after then");
		insertfeatures(db,f);
	})	
};*/

// function generate key and salt and insert in Institute_Configuration collection 
//instituteConfig is a json array as  parameter, example --> instituteConfig=[{"instName":"YMCA","instCode":"A121"}];
exports.instituteconfig=function(db,instituteConfig) //instituteConfig is a json array containing Institute name and code
{
	var instConfig=db.get('Institute_Configuration');
	var key='',salt = '', superSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@$%';
	var saltCount=1,keyCount=1;
	console.log("abc");
	//while(saltCount!=0)
	{
    	for (var i=0; i <= 20; i++) { 
			salt += superSet.charAt(Math.floor(Math.random()*superSet.length)); 
		}
		console.log("salt is",salt);
		//saltCount=instituteConfig.find({salt:"salt"},{}).count();
	}
	//while(keyCount!=0)
	{
		for (var i=0; i <= 10; i++) { 
		key += superSet.charAt(Math.floor(Math.random()*superSet.length)); 
		}
		console.log("key is",key);
		//keyCount=instituteConfig.find({key:"121"},{}).count();
		//console.log("count is "+keyCount);
	}
	
	//var key_salt=[{"key":'key',salt:'salt'}];
	instConfig.insert({
		instituteName:instituteConfig[0].instName,
		instituteCode:instituteConfig[0].instCode,
		key:key,
		salt:salt,
		enable:true
	},function(e,docs)
	{
		var keySalt=[{"key":key,"salt":salt}];
		console.log("hi");
		returnkeysalt(docs);	//return key and salt
	});
	
};

// function to Insert all features(eg guest features,students features and so on) in Institute_Configuration Collection

/* Feature is a json array as  parameter, example --> features=[{"instituteInfo":{"instName":'YMCA2',"instCode":'uk01'},
	"guestFeatures":{"academicInfo":true,"athletics":false,"universityEvent":true,"generalUniversityInfo":true,"searchCourses":false,"campusMap":true,"socialMedia":true,"admissionInfo":true,requestForInfo:false},
	"studentFeatures":{"viewClassSchedule":true,"viewEmail":false,"enrollAddDropSwap":true,"viewHolds":true,"viewToDos":false,"viewCommunication":false,"viewPayBill":true,"acceptDeclineFinancialAid":false,"updateBio":true,"viewGrade":false,"applyGraduation":true,"officialTranscript":true,"enrollmentVerification":false,"examSchedule":false},
	"facultyFeatures":{"teachingSchedule":true,"classRoster":false,"gradeRoster":true,"gradeToAllStudents":false,"examSchedule":true},
	"alumniFeatures":{"makeDonation":true,"alumniEventCalender":false,"updatePersonalInformation":true},
	"employeeFeatures":{"myPayCheck":true},
	"otherFeatures":{"admissionControlCenter":true,"authenticationSetup":true}
	}];*/
exports.insertfeatures=function(db,features) //features is json array containing all detail data of institute
{
	console.log("inside insert features");
	//var instConfig=db.get('Institute_Configuration');
	//var db=monk('localhost:27017/mUnivDashboard');
	//console.log(features);
	//console.log('inside insert features');
	//console.log(db);
	//console.log('hjjkkjkj');
	var err=1;
	var instFeature=db.get('Institute_Features');
	//console.log('after variable');
	/*instConfig.insert({
		instituteName:features[0].instituteInfo.instName,
		institutecode:features[0].instituteInfo.instCode
	});*/
	//console.log(instFeature);
	var instituteConfig=[{"instName":features[0].instituteInfo.instName,"instCode":features[0].instituteInfo.instCode}];
	instFeature.insert({
		instituteName:features[0].instituteInfo.instName,
		instituteCode:features[0].instituteInfo.instCode,
		gAcademicInfo:features[0].guestFeatures.academicInfo,
		gAthletics:features[0].guestFeatures.athletics,
		gUniversityEvent:features[0].guestFeatures.universityEvent,
		gGeneralUniversityInfo:features[0].guestFeatures.generalUniversityInfo,
		gSearchCourses:features[0].guestFeatures.searchCourses,
		gCampusMap:features[0].guestFeatures.campusMap,
		gSocialMedia:features[0].guestFeatures.socialMedia,
		gAdmissionInfo:features[0].guestFeatures.admissionInfo,
		gRequestForInfo:features[0].guestFeatures.requestForInfo,
		sViewClassSchedule:features[0].studentFeatures.viewClassSchedule,
		sViewEmail:features[0].studentFeatures.viewEmail,
		sEnrollAddDropSwap:features[0].studentFeatures.enrollAddDropSwap,
		sViewHolds:features[0].studentFeatures.viewHolds,
		sViewToDos:features[0].studentFeatures.viewToDos,
		sViewCommunication:features[0].studentFeatures.viewCommunication,
		sViewPayBill:features[0].studentFeatures.viewPayBill,
		sAcceptDeclineFinancialAid:features[0].studentFeatures.acceptDeclineFinancialAid,
		sUpdateBio:features[0].studentFeatures.updateBio,
		sViewGrade:features[0].studentFeatures.viewGrade,
		sApplyGraduation:features[0].studentFeatures.applyGraduation,
		sOfficialTranscript:features[0].studentFeatures.officialTranscript,
		sEnrollmentVerification:features[0].studentFeatures.enrollmentVerification,
		sExamSchedule:features[0].studentFeatures.examSchedule,
		fTeachingSchedule:features[0].facultyFeatures.teachingSchedule,
		fClassRoster:features[0].facultyFeatures.classRoster,
		fGradeRoster:features[0].facultyFeatures.gradeRoster,
		fGradeToAllStudents:features[0].facultyFeatures.gradeToAllStudents,
		fExamSchedule:features[0].facultyFeatures.examSchedule,
		aMakeDonation:features[0].alumniFeatures.makeDonation,
		aAlumniEventCalender:features[0].alumniFeatures.alumniEventCalender,
		aUpdatePersonalInformation:features[0].alumniFeatures.updatePersonalInformation,
		eMyPayCheck:features[0].employeeFeatures.myPayCheck,
		oAdmissionControlCenter:features[0].otherFeatures.admissionControlCenter,
		oAuthenticationSetup:features[0].otherFeatures.authenticationSetup
	});
	console.log('after insert');
	return(instituteConfig);  // will return json array containing  institute name and institute code
	//db_fun.instituteconfig(db_fun,db,features);
	//db_fun.instituteconfig(db,instituteConfig);
};

/*exports.registernewapp=function(db_fun,db,features)
{
	console.log("inside register new app");
	db_fun.insertfeatures(db_fun,db,features,instituteconfig);
	//console.log("back");
	//console.log("error is"+err);
	//console.log(k);
};*/

//function to update already store features on the basis of institute code 
/* Feature is a json array as  parameter , example --> features=[{"instituteInfo":{"instName":'YMCA2',"instCode":'uk01'},
	"guestFeatures":{"academicInfo":true,"athletics":false,"universityEvent":true,"generalUniversityInfo":true,"searchCourses":false,"campusMap":true,"socialMedia":true,"admissionInfo":true,requestForInfo:false},
	"studentFeatures":{"viewClassSchedule":true,"viewEmail":false,"enrollAddDropSwap":true,"viewHolds":true,"viewToDos":false,"viewCommunication":false,"viewPayBill":true,"acceptDeclineFinancialAid":false,"updateBio":true,"viewGrade":false,"applyGraduation":true,"officialTranscript":true,"enrollmentVerification":false,"examSchedule":false},
	"facultyFeatures":{"teachingSchedule":true,"classRoster":false,"gradeRoster":true,"gradeToAllStudents":false,"examSchedule":true},
	"alumniFeatures":{"makeDonation":true,"alumniEventCalender":false,"updatePersonalInformation":true},
	"employeeFeatures":{"myPayCheck":true},
	"otherFeatures":{"admissionControlCenter":true,"authenticationSetup":true}
	}];*/
exports.updatefeatures=function(db,features) 
{
	//var instConfig=db.get('Institute_Configuration');
	var instFeature=db.get('Institute_Features');
	/*instConfig.insert({
		instituteName:features[0].instituteInfo.instName,
		institutecode:features[0].instituteInfo.instCode
	});*/
	console.log("inside update features");
instFeature.update(
	{'instituteCode':features[0].instituteInfo.instCode},
	{$set:{
		instituteName:features[0].instituteInfo.instName,
		gAcademicInfo:features[0].guestFeatures.academicInfo,
		gAthletics:features[0].guestFeatures.athletics,
		gUniversityEvent:features[0].guestFeatures.universityEvent,
		gGeneralUniversityInfo:features[0].guestFeatures.generalUniversityInfo,
		gSearchCourses:features[0].guestFeatures.searchCourses,
		gCampusMap:features[0].guestFeatures.campusMap,
		gSocialMedia:features[0].guestFeatures.socialMedia,
		gAdmissionInfo:features[0].guestFeatures.admissionInfo,
		gRequestForInfo:features[0].guestFeatures.requestForInfo,
		sViewClassSchedule:features[0].studentFeatures.viewClassSchedule,
		sViewEmail:features[0].studentFeatures.viewEmail,
		sEnrollAddDropSwap:features[0].studentFeatures.enrollAddDropSwap,
		sViewHolds:features[0].studentFeatures.viewHolds,
		sViewToDos:features[0].studentFeatures.viewToDos,
		sViewCommunication:features[0].studentFeatures.viewCommunication,
		sViewPayBill:features[0].studentFeatures.viewPayBill,
		sAcceptDeclineFinancialAid:features[0].studentFeatures.acceptDeclineFinancialAid,
		sUpdateBio:features[0].studentFeatures.updateBio,
		sViewGrade:features[0].studentFeatures.viewGrade,
		sApplyGraduation:features[0].studentFeatures.applyGraduation,
		sOfficialTranscript:features[0].studentFeatures.officialTranscript,
		sEnrollmentVerification:features[0].studentFeatures.enrollmentVerification,
		sExamSchedule:features[0].studentFeatures.examSchedule,
		fTeachingSchedule:features[0].facultyFeatures.teachingSchedule,
		fClassRoster:features[0].facultyFeatures.classRoster,
		fGradeRoster:features[0].facultyFeatures.gradeRoster,
		fGradeToAllStudents:features[0].facultyFeatures.gradeToAllStudents,
		fExamSchedule:features[0].facultyFeatures.examSchedule,
		aMakeDonation:features[0].alumniFeatures.makeDonation,
		aAlumniEventCalender:features[0].alumniFeatures.alumniEventCalender,
		aUpdatePersonalInformation:features[0].alumniFeatures.updatePersonalInformation,
		eMyPayCheck:features[0].employeeFeatures.myPayCheck,
		oAdmissionControlCenter:features[0].otherFeatures.admissionControlCenter,
		oAuthenticationSetup:features[0].otherFeatures.authenticationSetup}
	});
};

// function to insert user Configuration
/*userConfig is a json array as  parameter, example --> userConfig=[{"userName":'Sumit',"fullName":'sumit Arora',
 "email":'sumit@gmail.com',"password":'jjkjk'}]; */
exports.insertuserconfig=function(db,userConfig)
{
	var uConfig=db.get('User_Config');
	console.log("insise insert user config");
	uConfig.insert({
		userName:userConfig[0].userName,
		fullName:userConfig[0].fullName,
		email:userConfig[0].email,
		password:userConfig[0].password

	});
	console.log("after insert");
};
// Function to edit full name and email on the basis of user name
/* userConfig is a json array as  parameter,  example --> userConfig=[{"userName":'Sumit',"fullName":'sumit Arora',
 "email":'sumit@gmail.com'}];*/
exports.edituserconfig=function(db,userConfig) //userConfig is a json array which contain username and first name and emailid which we need to update.
{
	var uConfig=db.get('User_Config');     // user_config is our collection
	console.log("inside edit user config");
	uConfig.update(
		{'userName':userConfig[0].userName},
		{$set:{
			'fullName':userConfig[0].fullName,
			'email':userConfig[0].email }
		}
	);
};
// Function to edit password on the basis of user name
/* userConfig is a json array as  parameter,  example --> userConfig=[{"userName":'Sumit',"password":'12334'}];*/
exports.changepassword=function(db,userConfig) //userConfig is a json array which contain username and new password
{
	var uConfig=db.get('User_Config'); // user_config is our collection   
	console.log("inside change password");
	uConfig.update(
		{'userName':userConfig[0].userName},
		{$set:{
			'password':userConfig[0].newPassword }
		}
	);
};
// Function to delete a user.
/* userConfig is a json array as  parameter,  example --> userConfig=[{"userName":'Sumit'}];*/
exports.deleteuser=function(db,userConfig) //userConfig is a json array whic contain user name
{
	var uConfig=db.get('User_Config'); // user_config is our collection
	uConfig.remove({userName:userConfig[0].userName});
};

// Function for login
//info=[{"username":'gaurav'}]; 
exports.loginuser=function(db,info)
{
	console.log("inside login user");
	var uConfig=db.get('User_Config'); // User_Config is our collection
	console.log(info);
	var userName=info[0].username;
	//var password=info[0].password;
	//var a;
	console.log("User name is"+userName);
	//console.log("Check password");
	//var pass=db.uConfig.find({"password":password},{"userName":1,"_id":0});
	var data=uConfig.findOne({"userName":userName},{}, function(e, docs) 
	{
		console.log(docs.password);
		returnpassword(docs);
			
	});
		//console.log(uConfig.find({"password":password},{"userName":1,"_id":0}));
		//var parsed = JSON.parse(data);
		/*if (data) {
			console.log("data is ");
			console.log(data.password);	
		} else {
			console.log("data is undefined");
		}*/
		//console.log("a is"+a);
		
		//console.log("data is "+parsed.userName);
		//.toArray(function(err,docs){
			//var count=docs.length;
		//});
		//console.log(pass);
	
};
//instCode=[{"instituteCode":'uk01'}];
exports.getdatainstitute=function(db,instCode)
{
	var instFeature=db.get('Institute_Features');
	var instCode=instCode[0].instituteCode;
	console.log(instCode);
	var data=instFeature.findOne({"instituteCode":instCode},{}, function(e, docs) 
	{
		console.log(docs.gAcademicInfo);
		//a=docs.instituteName;
		//console.log("a is"+a);
		 //f=[{"instituteInfo":{"instName":docs.instituteName,"instCode":docs.instituteCode}}];
		//console.log("data is"+f[0].instituteInfo.instName);
		/*var features=[{"instituteInfo":{"instName":docs.instituteName,"instCode":docs.instituteCode},
		"guestFeatures":{"academicInfo":docs.gAcademicInfo,"athletics":docs.gAthletics,"universityEvent":docs.gUniversityEvent,"generalUniversityInfo":docs.gGeneralUniversityInfo,"searchCourses":docs.gSearchCourses,"campusMap":docs.gCampusMap,"socialMedia":docs.gSocialMedia,"admissionInfo":docs.gAdmissionInfo,requestForInfo:docs.gRequestForInfo},
		"studentFeatures":{"viewClassSchedule":docs.sViewClassSchedule,"viewEmail":docs.sViewEmail,"enrollAddDropSwap":docs.sEnrollAddDropSwap,"viewHolds":docs.sViewHolds,"viewToDos":docs.sViewToDos,"viewCommunication":docs.sViewCommunication,"viewPayBill":docs.sViewPayBill,"acceptDeclineFinancialAid":docs.sAcceptDeclineFinancialAid,"updateBio":docs.sUpdateBio,"viewGrade":docs.sViewGrade,"applyGraduation":docs.sApplyGraduation,"officialTranscript":docs.sOfficialTranscript,"enrollmentVerification":docs.sEnrollmentVerification,"examSchedule":docs.sExamSchedule},
		"facultyFeatures":{"teachingSchedule":docs.fTeachingSchedule,"classRoster":docs.fClassRoster,"gradeRoster":docs.fGradeRoster,"gradeToAllStudents":docs.fGradeToAllStudents,"examSchedule":docs.fExamSchedule},
		"alumniFeatures":{"makeDonation":docs.aMakeDonation,"alumniEventCalender":docs.aAlumniEventCalender,"updatePersonalInformation":docs.aUpdatePersonalInformation},
		"employeeFeatures":{"myPayCheck":docs.eMyPayCheck},
		"otherFeatures":{"admissionControlCenter":docs.oAdmissionControlCenter,"authenticationSetup":docs.oAuthenticationSetup}
		}];*/

		//console.log("data is"+features[0].employeeFeatures.myPayCheck);
		returndatainstitute(docs);
		
			
	});
	
	//return(f);
};
exports.getdatauserconfig=function(db,info)
{
	var uConfig=db.get('User_Config');
	var userName=info[0].username;
	console.log(userName);
	var data=uConfig.findOne({"userName":userName},{}, function(e, docs) 
	{
		
		//var a=docs.fullName;
		console.log("data is"+docs.fullName);
		returnuserconfig(docs);
		//retun(a);
			
	});

};
exports.getallinstitutes=function(db)
{
	var instConfig=db.get('Institute_Configuration');
	var data=instConfig.find({},{}, function(e, docs) 
	{
		
		//var a=docs.fullName;
		console.log("data is");
		returnallinstitutes(docs);
		//retun(a);
			
	});
};
exports.getallusers=function(db)
{
	var uConfig=db.get('User_Config');
	var data=uConfig.find({},{}, function(e, docs) 
	{
		
		//var a=docs.fullName;
		console.log("data is");
		returnallusers(docs);
		//return docs;
			
	});
	console.log("getallusers is");
	console.log(data);
	//return data;
};
exports.countregisterinstitutes=function(db)
{
	var instConfig=db.get('Institute_Configuration');
	var data=instConfig.find({},{},function(e,docs)
	{
		var totalInstitutes=docs.length;
		console.log(totalInstitutes);
		returntotalinstitutes(totalInstitutes);
	});

};
exports.countregisterusers=function(db)
{
	var uConfig=db.get('User_Config');
	var data=uConfig.find({},{},function(e,docs)
	{
		var totalUsers=docs.length;
		console.log(totalUsers);
		returntotalusers(totalUsers);
	});

};
//TODO
// Login(done with funtion)
// Reset Password
// Web Service to Fetch all data 