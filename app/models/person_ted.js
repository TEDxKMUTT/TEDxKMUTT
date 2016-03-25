var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onePerson = new Schema({
  prefix: String,
  name: String,
  sname: String,
  nick: String,
  age: Number,
  gender: String,
  genderf: String,
  faculty: String,
  facultyf: String,
  department: String,
  departmentf: String,
  year: Number,
  stdID: Number,
  email: String,
  phone: Number,
  group: String,
  groupf: String,
  subGroup: String,
  subGroupf: String,
  subSubGroup: String,
  subSubGroupf: String,
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  // $scope.formData.curatorQ1;
	// $scope.formData.curatorQ2;
	// $scope.formData.creativeQ1;
	// $scope.formData.pmQ1;
  cuQ1: String,
  cuQ2: String,
  creQ1: String,
  pmQ1: String,
  speaker: String,
  accode: String,
  acurl: String,
  status: Number,
  ID: Number,
  Ident: String,
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
