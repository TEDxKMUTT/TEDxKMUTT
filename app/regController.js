// app.controller('regController',['$scope','$location','$anchorScroll',function($scope,$location,$anchorScroll){
// 	//Form data
// 	$scope.formData = {};
// 	$scope.formData.prefix = "--";
// 	$scope.formData.name;
// 	$scope.formData.lastname;
// 	$scope.formData.nickname;
// 	$scope.formData.age;
// 	$scope.formData.gender;
// 	$scope.formData.faculty = "--";
// 	$scope.formData.department;
// 	$scope.formData.year = "--";
// 	$scope.formData.email;
// 	$scope.formData.phone;
// 	$scope.formData.group;
// 	$scope.formData.q1;
// 	$scope.formData.q2;
// 	$scope.formData.q3;
// 	$scope.formData.q4;
//
// 	//Is Submit button hit?
// 	$scope.submitted = false;
//
// 	//Dropdown data
// 	$scope.dropdown = {};
//
// 	$scope.dropdown.prefix = {};
// 	$scope.dropdown.prefix.data = ["นาย","นาง","นางสาว"];
// 	$scope.dropdown.prefix.select = null;
//
// 	$scope.dropdown.faculty = {};
// 	$scope.dropdown.faculty.data = ["คณะวิศวกรรมศาสตร์","คณะวิทยาศาสตร์","คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี","คณะเทคโนโลยีสารสนเทศ","คณะสถาปัตยกรรมศาสตร์และการออกแบบ","สถาบันวิทยาการหุ่นยนต์ภาคสนาม","วิทยาลัยสหวิทยาการ"];
// 	$scope.dropdown.faculty.select = null;
//
// 	$scope.dropdown.year = {};
// 	$scope.dropdown.year.data = ['1','2','3','4'];
// 	$scope.dropdown.year.select = null;
//
// 	//Checkbox-Div data
// 	$scope.checkDiv = {};
//
// 	$scope.checkDiv.gender = {};
// 	$scope.checkDiv.gender.icon = ["mars","venus","transgender"]
// 	$scope.checkDiv.gender.data = ["ชาย","หญิง","อื่นๆ"];
// 	$scope.checkDiv.gender.select = null;
//
// 	$scope.checkDiv.group = {};
// 	$scope.checkDiv.group.data = ["Product management","Curator","Creative"];
// 	$scope.checkDiv.group.icon = ["archive","user","paint-brush"];
// 	$scope.checkDiv.group.select = null;
//
// 	//Select dropdown list
// 	$scope.selectOption = function(type,name,index)
// 		{
// 		$scope[type][name].select = index;
// 		$scope.formData[name] = $scope[type][name].data[index];
// 		}
//
// 	$scope.submitForm = function(formData)
// 		{
// 		$scope.submitted = true;
//
// 		if($scope.regisForm.$valid && $scope.dropdown.prefix.select != null && $scope.dropdown.faculty.select != null && $scope.dropdown.year.select != null && $scope.checkDiv.gender.select != null && $scope.checkDiv.group.select != null)
// 			{
// 			console.log($scope.formData);
// 			//Sent to DB API
// 			}
// 		else
// 			{
// 			$location.hash('top');
//       		$anchorScroll();
// 			}
// 		}
//
// }]);
