// We have three collections Institute_Features,Institute_Configuration,User_Configuration


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
	console.log("User name is"+userName);
	var data=uConfig.findOne({"userName":userName},{}, function(e, docs) 
	{
		console.log(docs.password);
		returnpassword(docs);
			
	});
		
};
//instCode=[{"instituteCode":'uk01'}];
/*this function will return all features of institute*/
exports.getdatainstitute=function(db, res, instCode)
{
	console.log("inside getdatainstitute");
	var instFeature=db.get('Institute_Features');
	//var instCode=instCode.i;
	console.log("inst code asked for "+instCode);
	var data=instFeature.find({},{}, function(e, docs) 
	{
		//console.log(docs);
		for(var i = 0; i < docs.length; i++){
			console.log(docs[i].instituteInfo[0].instituteCode);
			if(docs[i].instituteInfo[0].instituteCode === instCode)
			{
				console.log(docs[i]);
				res.send({succes: true, data: docs[i]});
				return;
			}
		}
		res.send({success: false, data: ""});
	});
	
};

exports.getdatainstituteks=function(db, res, qstr)
{
    
	console.log("inside getdatainstituteks");
	var instConfig = db.get('Institute_Configuration');
	var instFeature=db.get('Institute_Features');
	//var instCode=instCode.i;
	console.log("inst code asked for "+qstr.i);
	instConfig.find({"instituteCode" : qstr.i},{}, function(e, docs){
	    if(docs.length ==1){
		console.log(docs[0].key);
	        if((qstr.k === docs[0].key) && (qstr.s === docs[0].salt)){
		    console.log("Matched");
	            instFeature.find({"instituteInfo.instituteCode" : qstr.i}, {"_id" :0}, function (e1, docs1){
	                console.log(docs1);
	                res.send({success: true, data: docs1});
	            });
	        }
		else {
			res.send({success:false, data:"Authentication Failed!"});
		}
	    }
	});
};
/*will return detail of user depending on given userName passed as parameter */
exports.getdatauserconfig=function(db,info)
{
	var uConfig=db.get('User_Config');
	var userName=info.u;
	//console.log(userName);
	var data=uConfig.findOne({"userName":userName},{"password":0,"_id":0}, function(e, docs) 
	{
		
		//console.log("data is"+docs.fullName);
		return(docs);
				
	});

};
//will return detail of all institutes
exports.getallinstitutes=function(db, res)
{
	var instConfig=db.get('Institute_Configuration');
	var data=instConfig.find({},{key:0, salt:0}, function(e, docs) 
	{
		console.log(docs);
		res.send({success:true, data:docs});
				
	});
};
//return detail of all users
exports.getallusers=function(db, res)
{
	var uConfig = db.get('User_Config');
	var data=uConfig.find({},{_id:0, password:0}, function(e, docs) 
	{
		console.log(docs);
		res.send({success:true, data:docs});
	});
	
};
//return number of register institutes
exports.countinstitutes=function(db, res)
{
	var uConfig = db.get('Institute_Configuration');
	uConfig.find({},{}, function(e, docs)
	{
		//console.log(docs);
		if(docs)
			res.send({success: true, data: docs.length});
		else
			res.send({success: false, data:""});
	});
};
//return number of registered users
exports.countusers=function(db, res)
{
	var uConfig = db.get('User_Config');
	uConfig.find({},{}, function(e, docs)
	{
		//console.log(docs);
		if(docs) 
			res.send({success: true, data: docs.length});
		else
			res.send({success: false, data: ""});
	
	});
};
