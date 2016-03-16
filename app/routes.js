// angular.module('app').config(function($routeProvider, $locationProvider){
//   $routeProvider.when('/registration',{
//     templateUrl: 'template/registration.html',
//   }).when('/',{
//     templateUrl: 'template/home.html',
//   }).otherwise({ redirectTo: '/'});
//
//   $locationProvider.html5Mode(true);
// });

var mailer = require('./send_mail');
var PersonModel = require('./models/person_ted');

module.exports = function(app) {
  app.post('/api/reg_sav', function(req, res){

    // PersonModel
    // console.log("ROUTEs : \n" + req.body.age);
    PersonModel.create({
      prefix: req.body.prefix,
      name: req.body.name,
      sname: req.body.lastname,
      nick: req.body.nickname,
      age: req.body.age,
      gender: req.body.gender,
      faculty: req.body.faculty,
      department: req.body.department,
      year: req.body.year,
      stdID: req.body.studentID,
      email: req.body.email,
      phone: req.body.phone,
      group: req.body.group,
      q1: req.body.q1,
      q2: req.body.q2,
      q3: req.body.q3,
      q4: req.body.q4

    },function(err,person){
      if(err) res.send("create error : "  + err);
      mailer(req.body.name, req.body.email, req.body.group);
    });

  });
}
