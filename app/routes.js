// angular.module('app').config(function($routeProvider, $locationProvider){
//   $routeProvider.when('/registration',{
//     templateUrl: 'template/registration.html',
//   }).when('/',{
//     templateUrl: 'template/home.html',
//   }).otherwise({ redirectTo: '/'});
//
//   $locationProvider.html5Mode(true);
// });

// var mailer = require('./send_mail');
var mailer = require('./smtp_mail');
// var mailer = require('./send_mail_old');
var PersonModel = require('./models/person_ted');

var active_code = function(limit){

  var microsec = new Date().getTime();
  var accode = Math.floor(Math.random() * (94239847));
  var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < limit; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  text += accode;
  text += "_" + microsec;

  return text;
}


// var findObid = function()

module.exports = function(app) {
  const MAX = 15;
  const MIN = 8;
  var webUrl = 'https://tedxkmutt.com/';
  var length =Math.floor(Math.random() * (MAX-MIN + 1) + MIN);


  app.post('/api/reg_sav', function(req, res){
    var activecodes = active_code(length);

    // PersonModel
    PersonModel.create({
      prefix: req.body.prefix,
      name: req.body.name,
      sname: req.body.lastName,
      nick: req.body.nickname,
      age: req.body.age,
      gender: req.body.gender,
      genderf: req.body.genderFull,
      faculty: req.body.faculty,
      facultyf: req.body.facultyFull,
      department: req.body.department,
      departmentf: req.body.departmentFull,
      year: req.body.year,
      stdID: req.body.studentID,
      email: req.body.email,
      phone: req.body.phone,
      group: req.body.group,
      groupf: req.body.groupFull,
      subGroup: req.body.subGroup,
      subGroupf: req.body.subGroupFull,
      subSubGroup: req.body.subSubGroup,
      subSubGroupf: req.body.subSubGroupFull,
      q1: req.body.q1,
      q2: req.body.q2,
      q3: req.body.q3,
      q4: req.body.q4,
      accode: activecodes,
      acurl: webUrl + activecodes,
      status: 401

    },function(err,person){
      if(err) res.send("create error : "  + err);
      // console.log(req.body.lastname);
      console.log(req.body);
      // console.log(req.body.departmentFull);
      // mailer(req.body.name, req.body.email, req.body.group);
      // console.log(activecodes);
      // console.log(obid);
      mailer(req.body, "TEDxKMUTT: Welcome to TEDxKMUTT");
      // mailer(req.body.name, req.body.email, req.body.group, "TEDxKMUTT: Confirm your email", "https://tedxkmutt.com/active_code/" + activecodes);
    });



  });

  app.get('/ac/', function(req, res){
    console.log("test2");
    res.redirect('/active_codes/');
  });

  app.get('/active_code/:codei', function(req, res){
    // PersonModel.findOne({accode: req.params.codei}, function(err, info){
    //   if(err)
    //     console.log("error : " + err);
    //
    //     // res.json(info.status);
    //   // console.log(res.json(info));
    //   console.log(info.status);
    //   info.status = 200;
    // });
    PersonModel.findOne({accode: req.params.codei}, function(err, info){
      console.log(info);
      if(info==null){
        res.send("nusss");
      }else{
        res.send(info);
      }
    });


    // PersonModel.findOneAndUpdate({accode: req.params.codei}, {
    //   status: 200,
    // },
    //    function(err, info){
    //   if(err)
    //     console.log("error : " + err);
    //
    //     // res.json(info.status);
    //   // console.log(res.json(info));
    //   //console.log(info.status);
    // });



  });
}
