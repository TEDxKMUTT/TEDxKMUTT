'use strict';

// require your mailgun package
// Adding your key and domain to environment variables
// is important as you don’t want these values
// in your source control or otherwise exposed.
// process.env is an easy way to access your env variables
var   mongoose = require('mongoose'),
      // User = mongoose.model('User'),
      mailgun_api = 'key-0927846b3725a97399232b7b547073b6',
      mailgun_domain = 'antronic.link',
      Mailgun = require('mailgun-js'),
      // schedule = require('node-schedule'),
      Q = require('q'),
      // moment = require('moment'),
      //use nunjucks to render html templates w/ variables
      nunjucks = require('nunjucks');

/*
// find users that match criteria
var mailUsers = function (mailDay) {
  console.log('users fired');
  // setup promises
  var deffered = Q.defer();
  // find users with preferences.notificaitons that match today
  User.find().where('preferences.notifications.' + mailDay).equals(true).exec(
    function(err, user){
    var users = [];
    // handle error
    if (err) {
      deffered.reject(console.log('failed: ' + err));
    } else {
      // add all qualifying users to the users array
      for (var i = user.length - 1; i >= 0; i--) {
        users.push(user[i]);
      }
      deffered.resolve(users);
    }
  });
  return deffered.promise;
};
*/

// function to generate custom email
// for given users and return a mailing array
var mailCreatorx = function(users) {
  var mailing = [];


  for (var i = users.length - 1; i >= 0; i--) {
    // get an email template and pass in some variables
    var email = nunjucks.render('temp.html', {
      // username: users[i].firstName
      name: 'antronic123456789'
    });
    // add qualified users and their customized
    // email to the mailing
    mailing.push({
      user: users[i].email,
      email: email
    });
  }
  return mailing;
}

var mailCreator = function(name, mail, type) {
  var mailing = [];

  var email = nunjucks.render('temp.html', {
    name: name,
    type: type,
    url: 'https://tedxkmutt.com/active/dummy_lnwza_1234567890'
  });

  mailing.push({
    user: mail,
    contents: email
  });

  return mailing;
}

// var mailScheduler = function (job) {
//   // set rules for scheduler
//   var rule = new schedule.RecurrenceRule();
//       rule.dayOfWeek = [new schedule.Range(0, 6)];
//       rule.hour = 16;
//       rule.minute = 38;
//
//   schedule.scheduleJob(rule, job);
// };

// function to send user email given template and subject
var mailSender = function (userEmail, subject, html) {
    // setup promises
    var deffered = Q.defer();
    // create new mailgun instance with credentials
    var mailgun = new Mailgun({
      apiKey: mailgun_api,
      domain: mailgun_domain
    });
    // setup the basic mail data
    var mailData = {
      from: 'support@tedxxx.com',
      to: userEmail,
      subject:  subject,
      html: html
    };
    // send your mailgun instance the mailData
    mailgun.messages().send(mailData, function (err, body) {
      // If err console.log so we can debug
      if (err) {
        deffered.reject(console.log('failed: ' + err));
      } else {
        deffered.resolve(body)
      }
    });

    return deffered.promise;
};

// set mailDay to now
// Note! you will need to format
// the date to match the date
// in your user record

module.exports = function(name, mail, type){

  var mailing = mailCreator(name, mail, type);
  // for each mailing item, send an email
  for (var i = mailing.length - 1; i >= 0; i--) {
    // email each user with their custom template
    mailSender(mailing[i].user,'TEDxKMUTT : Confirm you e-mail', mailing[i].contents)
      .then(function (res) {
        console.log(res + "\n name : " + name + "\n mail : " + mail);
      })
      .catch(function (err) {
        console.log("error: " + err)
      })
  }

}
