// We have three collections Institute_Features,Institute_Configuration,User_Configuration

// function generate key and salt and insert in Institute_Configuration collection 
//instituteConfig is a json array as  parameter, example --> instituteConfig=[{"instName":"YMCA","instCode":"A121"}];
exports.insertinstitutedata=function(db,res,req,features,callbackdata) //instituteConfig is a json array containing Institute name and code
{
	var instConfig=db.get('Institute_Configuration');
	var instFeature=db.get('Institute_Features');
	var key='',salt = '', superSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@$%';
	
    	for (var i=0; i <= 20; i++) { 
			salt += superSet.charAt(Math.floor(Math.random()*superSet.length)); 
		}
		for (var i=0; i <= 10; i++) { 
		key += superSet.charAt(Math.floor(Math.random()*superSet.length)); 
		}
		console.log("key is",key);
		console.log(features);
		console.log(features[0].instituteInfo.instName);
		instFeature.insert({
		"instName":features[0].instituteInfo.instName,
		"instCode":features[0].instituteInfo.instCode,
		"gAcademicInfo":features[0].guestFeatures.academicInfo,
		"gAthletics":features[0].guestFeatures.athletics,
		"gUniversityEvent":features[0].guestFeatures.universityEvent,
		"gGeneralUniversityInfo":features[0].guestFeatures.generalUniversityInfo,
		"gSearchCourses":features[0].guestFeatures.searchCourses,
		"gCampusMap":features[0].guestFeatures.campusMap,
		"gSocialMedia":features[0].guestFeatures.socialMedia,
		"gAdmissionInfo":features[0].guestFeatures.admissionInfo,
		"gRequestForInfo":features[0].guestFeatures.requestForInfo,
		"sViewClassSchedule":features[0].studentFeatures.viewClassSchedule,
		"sViewEmail":features[0].studentFeatures.viewEmail,
		"sEnrollAddDropSwap":features[0].studentFeatures.enrollAddDropSwap,
		"sViewHolds":features[0].studentFeatures.viewHolds,
		"sViewToDos":features[0].studentFeatures.viewToDos,
		"sViewCommunication":features[0].studentFeatures.viewCommunication,
		"sViewPayBill":features[0].studentFeatures.viewPayBill,
		"sAcceptDeclineFinancialAid":features[0].studentFeatures.acceptDeclineFinancialAid,
		"sUpdateBio":features[0].studentFeatures.updateBio,
		"sViewGrade":features[0].studentFeatures.viewGrade,
		"sApplyGraduation":features[0].studentFeatures.applyGraduation,
		"sOfficialTranscript":features[0].studentFeatures.officialTranscript,
		"sEnrollmentVerification":features[0].studentFeatures.enrollmentVerification,
		"sExamSchedule":features[0].studentFeatures.examSchedule,
		"fTeachingSchedule":features[0].facultyFeatures.teachingSchedule,
		"fClassRoster":features[0].facultyFeatures.classRoster,
		"fGradeRoster":features[0].facultyFeatures.gradeRoster,
		"fGradeToAllStudents":features[0].facultyFeatures.gradeToAllStudents,
		"fExamSchedule":features[0].facultyFeatures.examSchedule,
		"aMakeDonation":features[0].alumniFeatures.makeDonation,
		"aAlumniEventCalender":features[0].alumniFeatures.alumniEventCalender,
		"aUpdatePersonalInformation":features[0].alumniFeatures.updatePersonalInformation,
		"eMyPayCheck":features[0].employeeFeatures.myPayCheck,
		"oAdmissionControlCenter":features[0].otherFeatures.admissionControlCenter,
		"oAuthenticationSetup":features[0].otherFeatures.authenticationSetup
		},function(e,docs){
			if(docs)
			{
				console.log("hi");
				instConfig.insert({
				"instituteName":features[0].instituteInfo.instName,
				"instituteCode":features[0].instituteInfo.instCode,
				"key":key,
				"salt":salt,
				"enable":true
			},function(e1,docs1){
				
				if(docs1)
				{
					var keySalt=[{"key":docs1.key,"salt":docs1.salt}];
					callbackdata(res,req,keySalt);
				}
				else
				{
					var keySalt="";
					callbackdata(res,req,keySalt);
				}
		
			});

			}
			else
			{
				var keySalt="";
				callbackdata(res,req,keySalt);	
			}
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
//exports.insertfeatures=function(db,features) //features is json array containing all detail data of institute
//{
//	console.log("inside insert features");
	//var instConfig=db.get('Institute_Configuration');
	//var db=monk('localhost:27017/mUnivDashboard');
	//console.log(features);
	//console.log('inside insert features');
	//console.log(db);
	//console.log('hjjkkjkj');
	//var err=1;
	//var instFeature=db.get('Institute_Features');
	//console.log('after variable');
	/*instConfig.insert({
		instituteName:features[0].instituteInfo.instName,
		institutecode:features[0].instituteInfo.instCode
	});*/
	//console.log(instFeature);
/*	var instituteConfig=[{"instName":features[0].instituteInfo.instName,"instCode":features[0].instituteInfo.instCode}];
	instFeature.insert({
		instituteInfo.instituteName:features[0].instituteInfo.instName,
		instituteInfo.instituteCode:features[0].instituteInfo.instCode,
		guestFeatures.gAcademicInfo:features[0].guestFeatures.academicInfo,
		guestFeatures.gAthletics:features[0].guestFeatures.athletics,
		guestFeatures.gUniversityEvent:features[0].guestFeatures.universityEvent,
		guestFeatures.gGeneralUniversityInfo:features[0].guestFeatures.generalUniversityInfo,
		guestFeatures.gSearchCourses:features[0].guestFeatures.searchCourses,
		guestFeatures.gCampusMap:features[0].guestFeatures.campusMap,
		guestFeatures.gSocialMedia:features[0].guestFeatures.socialMedia,
		guestFeatures.gAdmissionInfo:features[0].guestFeatures.admissionInfo,
		guestFeatures.gRequestForInfo:features[0].guestFeatures.requestForInfo,
		studentFeatures.sViewClassSchedule:features[0].studentFeatures.viewClassSchedule,
		studentFeatures.sViewEmail:features[0].studentFeatures.viewEmail,
		studentFeatures.sEnrollAddDropSwap:features[0].studentFeatures.enrollAddDropSwap,
		studentFeatures.sViewHolds:features[0].studentFeatures.viewHolds,
		studentFeatures.sViewToDos:features[0].studentFeatures.viewToDos,
		studentFeatures.sViewCommunication:features[0].studentFeatures.viewCommunication,
		studentFeatures.sViewPayBill:features[0].studentFeatures.viewPayBill,
		studentFeatures.sAcceptDeclineFinancialAid:features[0].studentFeatures.acceptDeclineFinancialAid,
		studentFeatures.sUpdateBio:features[0].studentFeatures.updateBio,
		studentFeatures.sViewGrade:features[0].studentFeatures.viewGrade,
		studentFeatures.sApplyGraduation:features[0].studentFeatures.applyGraduation,
		studentFeatures.sOfficialTranscript:features[0].studentFeatures.officialTranscript,
		studentFeatures.sEnrollmentVerification:features[0].studentFeatures.enrollmentVerification,
		studentFeatures.sExamSchedule:features[0].studentFeatures.examSchedule,
		facultyFeatures.fTeachingSchedule:features[0].facultyFeatures.teachingSchedule,
		facultyFeatures.fClassRoster:features[0].facultyFeatures.classRoster,
		facultyFeatures.fGradeRoster:features[0].facultyFeatures.gradeRoster,
		facultyFeatures.fGradeToAllStudents:features[0].facultyFeatures.gradeToAllStudents,
		facultyFeatures.fExamSchedule:features[0].facultyFeatures.examSchedule,
		alumniFeatures.aMakeDonation:features[0].alumniFeatures.makeDonation,
		alumniFeatures.aAlumniEventCalender:features[0].alumniFeatures.alumniEventCalender,
		alumniFeatures.aUpdatePersonalInformation:features[0].alumniFeatures.updatePersonalInformation,
		employeeFeatures.eMyPayCheck:features[0].employeeFeatures.myPayCheck,
		otherFeatures.oAdmissionControlCenter:features[0].otherFeatures.admissionControlCenter,
		otherFeatures.oAuthenticationSetup:features[0].otherFeatures.authenticationSetup
	});
	console.log('after insert');
	return(instituteConfig);  // will return json array containing  institute name and institute code
	//db_fun.instituteconfig(db_fun,db,features);
	//db_fun.instituteconfig(db,instituteConfig);
};
*/

//function to update already store features on the basis of institute code 
/* Feature is a json array as  parameter , example --> features=[{"instituteInfo":{"instName":'YMCA2',"instCode":'uk01'},
	"guestFeatures":{"academicInfo":true,"athletics":false,"universityEvent":true,"generalUniversityInfo":true,"searchCourses":false,"campusMap":true,"socialMedia":true,"admissionInfo":true,requestForInfo:false},
	"studentFeatures":{"viewClassSchedule":true,"viewEmail":false,"enrollAddDropSwap":true,"viewHolds":true,"viewToDos":false,"viewCommunication":false,"viewPayBill":true,"acceptDeclineFinancialAid":false,"updateBio":true,"viewGrade":false,"applyGraduation":true,"officialTranscript":true,"enrollmentVerification":false,"examSchedule":false},
	"facultyFeatures":{"teachingSchedule":true,"classRoster":false,"gradeRoster":true,"gradeToAllStudents":false,"examSchedule":true},
	"alumniFeatures":{"makeDonation":true,"alumniEventCalender":false,"updatePersonalInformation":true},
	"employeeFeatures":{"myPayCheck":true},
	"otherFeatures":{"admissionControlCenter":true,"authenticationSetup":true}
	}];*/
exports.updatefeatures=function(db,res,features) 
{
	
	var instFeature=db.get('Inst_Features');
	var instConfig=db.get('Institute_Configuration');
	console.log("inside update features");
	console.log(features[0].instituteInfo.instCode);
	instFeature.update(
	{'instituteInfo.instituteCode':features[0].instituteInfo.instCode},
	{$set:{
		"instituteInfo.instituteName":features[0].instituteInfo.instName,
		"guestFeatures.gAcademicInfo":features[0].guestFeatures.academicInfo,
		"guestFeatures.gAthletics":features[0].guestFeatures.athletics,
		"guestFeatures.gUniversityEvent":features[0].guestFeatures.universityEvent,
		"guestFeatures.gGeneralUniversityInfo":features[0].guestFeatures.generalUniversityInfo,
		"guestFeatures.gSearchCourses":features[0].guestFeatures.searchCourses,
		"guestFeatures.gCampusMap":features[0].guestFeatures.campusMap,
		"guestFeatures.gSocialMedia":features[0].guestFeatures.socialMedia,
		"guestFeatures.gAdmissionInfo":features[0].guestFeatures.admissionInfo,
		"guestFeatures.gRequestForInfo":features[0].guestFeatures.requestForInfo,
		"studentFeatures.sViewClassSchedule":features[0].studentFeatures.viewClassSchedule,
		"studentFeatures.sViewEmail":features[0].studentFeatures.viewEmail,
		"studentFeatures.sEnrollAddDropSwap":features[0].studentFeatures.enrollAddDropSwap,
		"studentFeatures.sViewHolds":features[0].studentFeatures.viewHolds,
		"studentFeatures.sViewToDos":features[0].studentFeatures.viewToDos,
		"studentFeatures.sViewCommunication":features[0].studentFeatures.viewCommunication,
		"studentFeatures.sViewPayBill":features[0].studentFeatures.viewPayBill,
		"studentFeatures.sAcceptDeclineFinancialAid":features[0].studentFeatures.acceptDeclineFinancialAid,
		"studentFeatures.sUpdateBio":features[0].studentFeatures.updateBio,
		"studentFeatures.sViewGrade":features[0].studentFeatures.viewGrade,
		"studentFeatures.sApplyGraduation":features[0].studentFeatures.applyGraduation,
		"studentFeatures.sOfficialTranscript":features[0].studentFeatures.officialTranscript,
		"studentFeatures.sEnrollmentVerification":features[0].studentFeatures.enrollmentVerification,
		"studentFeatures.sExamSchedule":features[0].studentFeatures.examSchedule,
		"facultyFeatures.fTeachingSchedule":features[0].facultyFeatures.teachingSchedule,
		"facultyFeatures.fClassRoster":features[0].facultyFeatures.classRoaster,
		"facultyFeatures.fGradeRoster":features[0].facultyFeatures.gradeRoaster,
		"facultyFeatures.fGradeToAllStudents":features[0].facultyFeatures.gradeToAllStudents,
		"facultyFeatures.fExamSchedule":features[0].facultyFeatures.examSchedule,
		"alumniFeatures.aMakeDonation":features[0].alumniFeatures.makeDonation,
		"alumniFeatures.aAlumniEventCalender":features[0].alumniFeatures.alumniEventCalender,
		"alumniFeatures.aUpdatePersonalInformation":features[0].alumniFeatures.updatePersonalInformation,
		"employeeFeatures.eMyPayCheck":features[0].employeeFeatures.myPayCheck,
		"otherFeatures.oadmissionControlCenter":features[0].otherFeatures.admissionControlCenter,
		"otherFeatures.oauthenticationSetup":features[0].otherFeatures.authenticationSetup}
	},function(e,docs)
	{
		if(docs) 
		{
			instConfig.update(
			{'instituteCode':features[0].instituteInfo.instCode},
			{$set:{
				"instituteName":features[0].instituteInfo.instName}
			},function(e1,docs1)
			{
				if(docs1)
				{
					res.send({success:true,data:"Sucessfully Updated"})	
				}
				else
				{
					res.send({success:true,data:""});
				}
				
			});
		}
		else
			res.send({success: false, data: ""});
	});
};

exports.returnInstituteFeatures=function(db,res,info)
{
	var instFeature=db.get('Inst_Features');
	var instCode=info[0].instituteInfo.instCode;
	console.log(instCode);
	instFeature.findOne({"instituteInfo.instCode":instCode},{}, function(e, docs) 
	{
		if(docs)
		{
			res.send({success:true,data:docs});
		}
		else
		{
			res.send({success: false, data: ""});
		}
		
				
	});

};
// function to insert user Configuration
/*userConfig is a json array as  parameter, example --> userConfig=[{"userName":'Sumit',"fullName":'sumit Arora',
 "email":'sumit@gmail.com',"password":'jjkjk'}]; */
exports.insertuserconfig=function(db,res,userConfig)
{
	var uConfig=db.get('User_Config');
	console.log("insise insert user config");
	uConfig.insert({
		userName:userConfig[0].userName,
		fullName:userConfig[0].fullName,
		email:userConfig[0].email,
		password:userConfig[0].password

	},function(e,docs)
	{
		if(docs)
		{
			res.send({success:true,data:"Sucessfully Updated"});
		}
		else
		{
			res.send({success: false, data: ""});
		}
	});
	
};
// Function to edit full name and email on the basis of user name
/* userConfig is a json array as  parameter,  example --> userConfig=[{"userName":'Sumit',"fullName":'sumit Arora',
 "email":'sumit@gmail.com'}];*/
exports.edituserconfig=function(db,res,userConfig) //userConfig is a json array which contain username and first name and emailid which we need to update.
{
	var uConfig=db.get('User_Config');     // user_config is our collection
	console.log("inside edit user config");
	uConfig.update(
		{'userName':userConfig[0].userName},
		{$set:{
			'fullName':userConfig[0].fullName,
			'email':userConfig[0].email }
		},function(e,docs)
		{
			if(docs)
			{
				res.send({success:true,data:"Sucessfully Updated"});
			}
			else
			{
				res.send({success: false, data: ""});
			}

		});
};
// Function to edit password on the basis of user name
/* userConfig is a json array as  parameter,  example --> userConfig=[{"userName":'Sumit',"password":'12334'}];*/
exports.changepassword=function(db,res,userConfig) //userConfig is a json array which contain username and new password
{
	var uConfig=db.get('User_Config'); // user_config is our collection   
	console.log("inside change password");
	uConfig.update(
		{'userName':userConfig[0].userName},
		{$set:{
			'password':userConfig[0].newPassword }
		},function(e,docs)
		{
			if(docs)
			{
				res.send({success:true,data:"Sucessfully Updated"});
			}
			else
			{
				res.send({success: false, data: ""});
			}

		});
};
// Function to delete a user.
/* userConfig is a json array as  parameter,  example --> userConfig=[{"userName":'Sumit'}];*/
exports.deleteuser=function(db,res,userConfig) //userConfig is a json array whic contain user name
{
	var uConfig=db.get('User_Config'); // user_config is our collection
	uConfig.remove({userName:userConfig[0].userName},function(e,docs){
			if(docs)
			{
				res.send({success:true,data:"Sucessfully Updated"});
			}
			else
			{
				res.send({success: false, data: ""});
			}
	});
};

// Function for login
//info=[{"username":'gaurav'}]; 
exports.loginuser=function(db,res,req,info, callbacksession)
{
	console.log("inside login user");
	var uConfig=db.get('User_Config'); // User_Config is our collection
	console.log(info);
	var email=info[0].email;
	console.log("email is "+email);
	var password = info[0].password;
	console.log("Password is "+password);

	uConfig.findOne({"email":email},{}, function(e, docs) 
	{
		if(docs){

			console.log("docs : "+docs);
			if(docs.password === password)
			{
				var data=true;
				callbacksession(res, req, data);
			}
			else
			{
				var data=false;
				callbacksession(res, req, data);
				
			}	
		}
		else{
			req.session.ui = {
				message: 'Invalid Username or Password Please Try Again'
			};
			res.redirect("/login");
		}
			
	});
		
};


//instCode=[{"instituteCode":'uk01'}];
/*this function will return all features of institute*/
exports.getdatainstitute=function(db, res, instC)
{
	console.log("inside getdatainstitute");
	var instFeature=db.get('Institute_Features');
	//var instCode=instCode.i;
	console.log("inst code asked for "+instC);
	var data=instFeature.find({instCode:instC},{}, function(e, docs) 
	{
		if(docs)
		{
			console.log("docs is");
			console.log(docs);	
			res.send({success: true, data: docs});
			return;
		}
		
		/*for(var i = 0; i < docs.length; i++){
			console.log(docs[i].instituteCode);
			if(docs[i].instituteCode === instCode)
			{
				console.log(docs[i]);
				console.log("here");
				res.send({succes: true, data: docs[i]});
				return;
			}
		}*/
		else
		{
			res.send({success: false, data: ""});
		}
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
exports.getdatauserconfig=function(db,res,info)
{
	var uConfig=db.get('User_Config');
	var userName=info[0].username;
	console.log(userName);
	uConfig.findOne({"userName":userName},{"password":0,"_id":0}, function(e, docs) 
	{
		if(docs)
		{
			res.send({success:true,data:docs});
		}
		else
		{
			res.send({success: false, data: ""});
		}
		
				
	});

};
//will return detail of all institutes
exports.getallinstitutes=function(db, res)
{
	var instConfig=db.get('Institute_Configuration');
	var data=instConfig.find({},{key:0, salt:0}, function(e, docs) 
	{
		if(docs)
		{
			res.send({success:true, data:docs});
		}
		else
		{
			res.send({success:false,data:""});
		}
				
	});
};
//return detail of all users
exports.getallusers=function(db, res)
{
	var uConfig = db.get('User_Config');
	var data=uConfig.find({},{_id:0, password:0}, function(e, docs) 
	{
		if(docs)
		{
			res.send({success:true, data:docs});
		}
		else
		{
			res.send({success:false,data:""});
		}
				
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
	console.log("inside countuser");
	uConfig.find({},{}, function(e, docs)
	{
		//console.log(docs);
		if(docs) 
			res.send({success: true, data: docs.length});
		else
			res.send({success: false, data: ""});
	
	});
};
