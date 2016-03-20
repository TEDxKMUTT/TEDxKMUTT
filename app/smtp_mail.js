'use strict';

var nodemailer = require('nodemailer'),
    // smtpTransport = require('nodemailer-smtp-transport'),
    mg = require('nodemailer-mailgun-transport'),
    mongoose = require('mongoose'),
    Mailgun = require('mailgun-js'),
    Q = require('q'),
    nunjucks = require('nunjucks');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  service: 'Mailgun',
  host: 'smtp.mailgun.org',
  auth: {
    user: 'tedxkmutt@antronic.link',
    pass: 'tedx123'
  }
}

// var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var nodemailerMailgun = nodemailer.createTransport(auth);

// var creator = function(name, email, type, link_active) {
var creator = function(data) {

  var mailing = [];

  var emailContent = nunjucks.render('temp.html', {
    name: data.name,
    surname: data.lastName,
    nick: data.nickname,
    age: data.age,
    group: data.groupFull,
    sgroup: data.subGroupFull,
    ssgroup: data.subSubGroupFull,
    fac: data.facultyFull,
    dep: data.departmentFull,
  });

  mailing.push({
    user: data.email,
    contents: emailContent
  });

  return mailing;
}

var sender = function(email, subject, html) {
  var deffered = Q.defer();
  nodemailerMailgun.sendMail({
      from: 'Support TEDxKMUTT <support@tedxkmutt.com>',
      // from: 'support@tedxkmutt.com',
      to: email,
      subject: subject,

      html: html
  }, function(error, info){
    if (error) {
      deffered.reject(console.log('failed: ' + error));
    } else {
      deffered.resolve(info)
    }
  });

  return deffered.promise;
};

// // link active
// module.exports = function(name, email, type, subject, link_active){
// // module.exports = function(name, email, type, subject){
//
//   var mailing = creator(name, email, type, link_active);
//   // var mailing = creator(name, email, type, 'https://tedxkmutt.com/active/dummy234567890');
//
//   for(var i = mailing.length -1; i>= 0; i--){
//     sender(mailing[i].user, subject, mailing[i].contents)
//       .then(function (response){
//         console.log(response + "\nname : " + name + "\nemail : " + email);
//       })
//       .catch(function (error){
//         console.log("error : " + error)
//       })
//   }
//
// }

// link active
module.exports = function(data, subject){
// module.exports = function(name, email, type, subject){

  // var mailing = creator(data.name, data.email, data.group, link_active);
  var mailing = creator(data);
  // var mailing = creator(name, email, type, 'https://tedxkmutt.com/active/dummy234567890');

  for(var i = mailing.length -1; i>= 0; i--){
    sender(mailing[i].user, subject, mailing[i].contents)
      .then(function (response){
        console.log(response + "\nname : " + data.name + "\nemail : " + data.email);
      })
      .catch(function (error){
        console.log("error : " + error)
      })
  }

}
