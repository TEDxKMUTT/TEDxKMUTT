var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onePerson = new Schema({
  prefix: String,
  name: String,
  sname: String,
  nick: String,
  age: Number,
  gender: String,
  faculty: String,
  department: String,
  year: Number,
  stdID: Number,
  email: String,
  phone: String,
  group: String,
  q1: String,
  q2: String,
  q3: String,
  q4: String
});


module.exports = mongoose.model('Person', onePerson, 'staff_db');


/*

$scope.formData = {};
$scope.formData.prefix = "--";/
$scope.formData.name;/
$scope.formData.lastna/me;/
$scope.formData.nicknam/e;/
$scope.formData.age;/
$scope.formData.gende/r;/
$scope.formData.faculty = "--";
$scope.formData.department;
$scope.formData.year = "--";
$scope.formData.email;
$scope.formData.phone;
$scope.formData.group;
$scope.formData.q1;
$scope.formData.q2;
$scope.formData.q3;
$scope.formData.q4;

*/
