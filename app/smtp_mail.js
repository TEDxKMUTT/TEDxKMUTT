'use strict'; // ignore with older javascript

var nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
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

// CREATE MAIL
var creator = function(data) {

  // array for contain the obj infomation
  var mailing = [];

  // variable for group
  var group = data.group;

  // initialize the variable for some group has 2 quest
  var groupQuestion1 = "";
  var groupQuestion2 = "";

  // check the type of that group
  if (group == "PM") {
    //set the group question
    groupQuestion1 = "Project Management Question : " + data.pmQ1;
  }
  if (group == "Cu") {
    groupQuestion1 = "Curator Question 1 : " + data.curatorQ1;
    groupQuestion2 = "Curator Question 2 : " + data.curatorQ2;
  }
  if (group == "Cr") {
    groupQuestion1 = "Creative Question : " + data.creativeQ1;
  }

  // we use nunjack for render the html for send the variable to html, and then export into MIME
  var emailContent = nunjucks.render('./app/mail_tmp/temp.html', {
    // here there are variable in html
    // e.g. name is the variable in html {{name}}
    // after ':' (colon) is the data that we would like to put into the variable
    name: data.name,
    surname: data.lastName,
    nick: data.nickname,
    age: data.age,
    group: data.groupFull,
    sgroup: data.subGroupFull,
    ssgroup: data.subSubGroupFull,
    fac: data.facultyFull,
    dep: data.departmentFull,
    groupQuest1: groupQuestion1,
    groupQuest2: groupQuestion2,
  });

  // push the data into mailing's array
  mailing.push({
    user: data.email,
    contents: emailContent
  });

  return mailing;
}


// function for send the email
var sender = function(email, subject, html) {
  // Q is the module for waiting the request until it done and send the data
  // so .defer just like create the waiter(does not the boy in the cafe but it's someone to waiting the request)
  var deffered = Q.defer();

  // here is the function to sending the mail
  nodemailerMailgun.sendMail({
    from: 'Support TEDxKMUTT <support@tedxkmutt.com>',
    to: email,
    subject: subject,
    // html that come from the params
    html: html
  }, function(error, info) {
    if (error) {
      // if has the error the deffered has no longer waiting anymore
      deffered.reject(console.log('failed: ' + error));
    } else {
      // else the deffered will send the data
      deffered.resolve(info)
    }
  });

  // and then return it
  return deffered.promise;
};


module.exports = function(data, subject) {

  // data is the params to recieve the obj
  var mailing = creator(data);

  sender(mailing[0].user, subject, mailing[0].contents)
    .then(function(response) {
      console.log(response + "\nname : " + data.name + "\nemail : " + data.email);
    })
    .catch(function(error) {
      console.log("error : " + error)
    })


}
