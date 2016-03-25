// This file also use idea with smtp_mail.js
'use strict'; // ignore with older javascript

var PersonModel = require('./models/person_ted'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  mg = require('nodemailer-mailgun-transport'),
  mongoose = require('mongoose'),
  Mailgun = require('mailgun-js'),
  Q = require('q'),
  nunjucks = require('nunjucks');

  var auth = {
    // Select the service of mail
    // e.g. 'Google'
    service: 'Mailgun',
    // SMTP HOST
    host: 'smtp.mailgun.org',
    port: 465,
    auth: {
      // USER and PASSWORD for auth to SMTP server
      user: 'tedxkmutt@antronic.link',
      pass: 'tedx123'
    }
  }

  // ESTABLISH TO SMTP SERVER
  var nodemailerMailgun = nodemailer.createTransport(smtpTransport(auth));

// THIS FUNCTION I use to query the users
// but in this example I use to find the users that are not cuQ type
// and then push them into the array

var queryUser = function() {

  var deffered = Q.defer();

  // .find function is the function of mongoose module
  PersonModel.find(function(err, user) {

    console.log(user.length); // This line I use to debug the amount of users

    //
    var users = [];
    if (err) {
      deffered.reject(console.log('failed: ' + err));
    } else {
      // user -> array all data
      for (var i = user.length - 1; i >= 0; i--) {
        var cuQ = user[i].cuQ1;

        if (cuQ == undefined) {
          console.log("not found");
          users.push(user[i]);
        }
      }
      deffered.resolve(users);
    }
  });
  return deffered.promise;
};


// var creator = function(name, email, type, link_active) {
var creator = function(data) {

  var mailing = [];

  for(var i = data.length - 1; i>= 0; i--){
    var emailContent = nunjucks.render('temp_loop.html', {
      name: data[i].name,
      surname: data[i].sname,
      nick: data[i].nick,
      age: data[i].age,
      gender: data[i].genderf,
      fac: data[i].facultyf,
      dep: data[i].departmentf,
      year: data[i].year,
      stdID: data[i].stdID,
      email: data[i].email,
      phone: data[i].phone,
      group: data[i].groupf,
      sgroup: data[i].subGroupf,
      ssgroup: data[i].subSubGroupf,
      q1: "คำถามข้อที่ 1 " + data[i].q1,
      q2: "คำถามข้อที่ 2 " + data[i].q2,
      q3: "คำถามข้อที่ 3 " + data[i].q3,
      q4: "คำถามข้อที่ 4 " + data[i].q4,
    });

    mailing.push({
      user: data[i].email,
      contents: emailContent
    });
  }

  return mailing;
}

var sender = function(email, subject, html) {
  var deffered = Q.defer();

  nodemailerMailgun.sendMail({
    from: 'Support TEDxKMUTT <support@tedxkmutt.com>',
    to: email,
    subject: subject,

    html: html
  }, function(error, info) {
    if (error) {
      deffered.reject(console.log('failed: ' + error));
    } else {
      deffered.resolve(info)
    }
  });

  return deffered.promise;
};

module.exports = function() {

  queryUser()
    .then(function(users){
      var mailing = creator(users);
      // this is the loop for send the mail to every user in the mailing array
      for(var i = mailing.length - 1; i>= 0; i--) {
        sender(mailing[i].user, "TEDxKMUTT: แจ้งข้อผิดพลาดระบบสมัคร", mailing[i].contents)
          .then(function (res){
            console.log(res);
          })
          .catch(function(err){
            console.log("error[mail loop]: " + err)
          })
      }
      res.send("SUCCESS");
    })

}
