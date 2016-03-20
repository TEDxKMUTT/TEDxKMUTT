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


var mailCreator = function(name, mail, type, active_code) {
  var mailing = [];

  var email = nunjucks.render('temp.html', {
    name: name,
    type: type,
    url: active_code
  });

  mailing.push({
    user: mail,
    contents: email
  });

  return mailing;
}

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
      from: 'TEDxKMUTT Support<tedxkmutt@antronic.link>',
      to: userEmail,
      replyTo: 'support@tedxkmutt.com',
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

module.exports = function(name, mail, type, subject, active_code){

  var mailing = mailCreator(name, mail, type, active_code);

  for (var i = mailing.length - 1; i >= 0; i--) {

    mailSender(mailing[i].user, subject, mailing[i].contents)
      .then(function (res) {
        console.log("SEND!" + "\n name : " + name + "\n mail : " + mail);
      })
      .catch(function (err) {
        console.log("error: " + err)
      })
  }

}
