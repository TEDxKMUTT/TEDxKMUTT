var app = angular.module('tedxkmutt', ['ngSanitize','ngRoute','ngAnimate','ui.bootstrap']);
// Routes
app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/',{
    templateUrl: "app/template/home.html",
    controller: 'homeController',
    controllerAs: 'home'
  })
  .when('/registration',{
    templateUrl: "app/template/regis.html",
    controller: 'regController',
    controllerAs: 'reg'
  })

  .when('/about/',{
    templateUrl: "app/template/about.html",
    controller: 'aboutController',
    controllerAs: 'about'
  })
  .otherwise({ redirectTo: '/'});

  // $locationProvider.html5Mode(true);

});

//AnchorScroll handle for regis page
app.run(function($rootScope, $location, $anchorScroll) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    if($location.hash()) $anchorScroll();  
  });
});

// Controller
app.controller('homeController', function($scope, $sce) {
  $scope.page = 'tedx';
  $scope.content = hContent.en;
  clang = 'en';

  $scope.lang = function(changeLang) {
    if (changeLang == 'en') {
      clang = 'en';
      $scope.content = hContent.en;
      // console.log("lang en");
    } else {
      clang = 'th';
      $scope.content = hContent.th;
      // console.log("lang th");
    };
  };
  $scope.isLang = function(chk) {
    // console.log(clang);
    return clang == chk;
  };
  $scope.getHTML = function(html){
    return $sce.trustAsHtml(html);
  };
});

app.controller('aboutController',function($scope, $sce){
  $scope.page = 'about';
  $scope.content = aContent;
  clang = 'en';
  //
  // $scope.lang = function(changeLang) {
  //   if (changeLang == 'en') {
  //     clang = 'en';
  //     $scope.content = aContent.en;
  //     // console.log("lang en");
  //   } else {
  //     clang = 'th';
  //     $scope.content = aContent.th;
  //     // console.log("lang th");
  //   };
  // };
  $scope.isLang = function(chk) {
    // console.log(clang);
    return clang == chk;
  };
  $scope.getHTML = function(html){
    return $sce.trustAsHtml(html);
  };
});

app.controller('date', function($scope) {
  this.dates = new Date();
  $scope.year = this.dates.getFullYear();
});

//Registration Controller
app.controller('regController',['$scope', '$http', '$location','$anchorScroll',function($scope,$http,$location,$anchorScroll){
	//Form data
	$scope.formData = {};
	$scope.formData.name;
	$scope.formData.lastname;
	$scope.formData.nickname;
	$scope.formData.age;
	$scope.formData.gender;
	$scope.formData.genderFull;
	$scope.formData.faculty;
	$scope.formData.facultyFull;
	$scope.formData.department;
	$scope.formData.departmentFull;
	$scope.formData.year;
	$scope.formData.email;
	$scope.formData.phone;
	$scope.formData.group;
	$scope.formData.subGroup;
	$scope.formData.subSubGroup;
	$scope.formData.groupFull;
	$scope.formData.subGroupFull;
	$scope.formData.subSubGroupFull;
	$scope.formData.q1;
	$scope.formData.q2;
	$scope.formData.q3;
	$scope.formData.q4;
	$scope.formData.curatorQ1;
	$scope.formData.curatorQ2;
	$scope.formData.creativeQ1;
	$scope.formData.pmQ1;
	$scope.formData.speaker;
	
	

	//Is Submit button hit?
	$scope.submitted = false;
	$scope.warning = false;

	//Store sub case status
	$scope.subCase = {};
	
	//Dropdown data
	$scope.dropdown = {};

	$scope.dropdown.prefix = {};
	$scope.dropdown.prefix.data = ["นาย","นาง","นางสาว"];
	$scope.dropdown.prefix.val = ["Mr","Mrs","Ms"]
	$scope.dropdown.prefix.select = null;
	$scope.dropdown.prefix.text = "--";

	$scope.dropdown.faculty = {};
	$scope.dropdown.faculty.data = ["คณะวิศวกรรมศาสตร์","คณะวิทยาศาสตร์","คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี","คณะเทคโนโลยีสารสนเทศ","คณะสถาปัตยกรรมศาสตร์และการออกแบบ","สถาบันวิทยาการหุ่นยนต์ภาคสนาม","วิทยาลัยสหวิทยาการ"];
	$scope.dropdown.faculty.val = ["Eng","Sci","Ind","IT","Arch","FIBO","MultiSci"];
	$scope.dropdown.faculty.select = null;
	$scope.dropdown.faculty.text = "--";
	
	$scope.subCase.department = {};
	$scope.subCase.department.select = null;
	$scope.subCase.department.text = "--";
	
	$scope.dropdown.depEng = {};
	$scope.dropdown.depEng.data = ["วิศวกรรมเคมี","วิศวกรรมเครื่องกล","วิศวกรรมไฟฟ้า","วิศวกรรมโยธา","วิศวกรรมอุตสาหการและเมคคาทรอนิกส์","วิศวกรรมคอมพิวเตอร์","วิศวกรรมระบบควบคุมและเครื่องมือวัด","วิศวกรรมสิ่งแวดล้อม","วิศวกรรมไฟฟ้าสื่อสารและอิเล็กทรอนิกส์","วิศวกรรมวัสดุและเครื่องมือ"];
	$scope.dropdown.depEng.val = ["CHM","ME","EE","CE","PEMCE","CPE","INC","ENV","ENE","TME"];
	$scope.dropdown.depEng.select = null;
	$scope.dropdown.depEng.text = "--";
	
	$scope.dropdown.depSci = {};
	$scope.dropdown.depSci.data = ["คณิตศาสตร์","เคมี","ฟิสิกส์ประยุกต์","จุลชีววิทยา","วิทยาการคอมพิวเตอร์ประยุกต์","สถิติ","วิทยาศาสตร์และเทคโนโลยีการอาหาร"];
	$scope.dropdown.depSci.val = ["MTH","CHE","PHY","MIC","CS","STA","FS"];
	$scope.dropdown.depSci.select = null;
	
	$scope.dropdown.depInd = {};
	$scope.dropdown.depInd.data = ["เทคโนโลยีการพิมพ์และบรรจุภัณฑ์","เทคโนโลยีอุตสาหกรรม","วิทยาการคอมพิวเตอร์ประยุกต์-มัลติมีเดีย","วิศวกรรมเครื่องกล","วิศวกรรมไฟฟ้า","วิศวกรรมโยธา","วิศวกรรมอุตสาหการ","เทคโนโลยีการศึกษาและการสื่อสารมวลชน","เทคโนโลยีมีเดีย","มีเดียอาตส์","มีเดียทางการแพทย์และวิทยาศาสตร์"];
	$scope.dropdown.depInd.val = ["PRI","InT","CM","ME","EE","CE","PE","EDU","MET","MEA","MES"];
	$scope.dropdown.depInd.select = null;
	$scope.dropdown.depInd.text = "--";
	
	$scope.dropdown.depIT = {};
	$scope.dropdown.depIT.data = ["วิทยาการคอมพิวเตอร์","เทคโนโลยีสารสนเทศ"];
	$scope.dropdown.depIT.val = ["CS","IT"];
	$scope.dropdown.depIT.select = null;
	
	$scope.dropdown.depArch = {};
	$scope.dropdown.depArch.data = ["สถาปัตยกรรม","สถาปัตยกรรมภายใน","การออกแบบอุตสาหกรรม","ออกแบบนิเทศศิลป์"];
	$scope.dropdown.depArch.val = ["ARC","INT","IND","COM"];
	$scope.dropdown.depArch.select = null;
	
	$scope.dropdown.depFIBO = {};
	$scope.dropdown.depFIBO.data = ["วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ"];
	$scope.dropdown.depFIBO.val = ["RA"];
	$scope.dropdown.depFIBO.select = null;
	$scope.dropdown.depFIBO.text = "--";
	
	$scope.dropdown.depMultiSci = {};
	$scope.dropdown.depMultiSci.data = ["วิทยาศาสตร์และเทคโนโลยี"];
	$scope.dropdown.depMultiSci.val = ["ST"];
	$scope.dropdown.depMultiSci.select = null;

	$scope.dropdown.year = {};
	$scope.dropdown.year.data = ['1','2','3','4'];
	$scope.dropdown.year.val = ['1','2','3','4'];
	$scope.dropdown.year.select = null;
	$scope.dropdown.year.text = "--";

	//Checkbox-Div data
	$scope.checkDiv = {};

	$scope.checkDiv.gender = {};
	$scope.checkDiv.gender.icon = ["mars","venus","transgender"]
	$scope.checkDiv.gender.val = ["M","F","O"];
	$scope.checkDiv.gender.data = ["ชาย","หญิง","อื่นๆ"];
	$scope.checkDiv.gender.select = null;

	$scope.checkDiv.group = {};
	$scope.checkDiv.group.data = ["Product management","Curator","Creative"];
	$scope.checkDiv.group.val = ["PM","Cu","Cr"];
	$scope.checkDiv.group.icon = ["briefcase","binoculars","paint-brush"];
	$scope.checkDiv.group.select = null;
	
	$scope.subCase.subGroup = {};
	$scope.subCase.subGroup.select;
	$scope.subCase.subGroup.text;
	$scope.subCase.subGroup.valid = true;
	
	$scope.checkDiv.subPM = {};
	$scope.checkDiv.subPM.data = ["Sponsor","Finance","Support","Documentation","Contractor"];
	$scope.checkDiv.subPM.val = ["Spo","Fin","Sup","Doc","Con"];
	$scope.checkDiv.subPM.icon = ["bank","money","archive","book","edit"];
	$scope.checkDiv.subPM.select = null;
	
	$scope.checkDiv.subCr = {};
	$scope.checkDiv.subCr.data = ["Public Relation","Digital Production","Stage","Activity"];
	$scope.checkDiv.subCr.val = ["PR","DP","Sta","Act"];
	$scope.checkDiv.subCr.icon = ["comments-o","tv","bullhorn","users"];
	$scope.checkDiv.subCr.select = null;
	
	$scope.subCase.subSubGroup = {};
	$scope.subCase.subSubGroup.select;
	$scope.subCase.subSubGroup.text;
	$scope.subCase.subSubGroup.valid = true;
	
	$scope.checkDiv.subPR = {};
	$scope.checkDiv.subPR.data = ["Creative","Marketing","Graphic Design","Copy Writing"];
	$scope.checkDiv.subPR.val = ["Cre","Mar","GD","CW"];
	$scope.checkDiv.subPR.icon = ["paper-plane","line-chart","photo","file-text-o"];
	$scope.checkDiv.subPR.select = null;
	
	$scope.checkDiv.subDP = {};
	$scope.checkDiv.subDP.data = ["Photographs","Video Recording","Process Monitoring"];
	$scope.checkDiv.subDP.val = ["Pho","Vid","PMo"];
	$scope.checkDiv.subDP.icon = ["camera","video-camera","area-chart"];
	$scope.checkDiv.subDP.select = null;

	//Select dropdown list
	$scope.selectOption = function(type,name,index)
		{
		$scope[type][name].select = index;
		$scope[type][name].text = $scope[type][name].data[index];
		$scope.formData[name] = $scope[type][name].val[index];
		$scope.formData[name+'Full'] = $scope[type][name].text;
		}
	
	$scope.selectFaculty = function(index)
		{
		$scope.dropdown.faculty.select = index;
		$scope.formData.faculty = $scope.dropdown.faculty.val[index];
		$scope.dropdown.faculty.text = $scope.dropdown.faculty.data[index];
		$scope.subCase.department.text = "--";
		$scope.subCase.department.select = "dep"+$scope.dropdown.faculty.val[index];
		$scope.formData.department = null;
		
		$scope.formData.facultyFull = $scope.dropdown.faculty.text;
		$scope.formData.departmentFull = null;
		}
	
	$scope.selectDepartment = function(index)
		{
		var depObj = $scope.subCase.department.select;
		
		$scope.dropdown[depObj].select = index;
		$scope.formData.department = $scope.dropdown[depObj].val[index];
		$scope.subCase.department.text = $scope.dropdown[depObj].data[index];
		
		$scope.formData.departmentFull = $scope.subCase.department.text;
		}
	
	$scope.selectGroup = function(index)
		{
		
		//clear old question if change group
		if(index != $scope.checkDiv.group.select)
			{
			$scope.formData.curatorQ1 = null;
			$scope.formData.curatorQ2 = null;
			$scope.formData.creativeQ1 = null;
			$scope.formData.pmQ1 = null;
			$scope.regisForm.curatorQ1.$touched = false;
			$scope.regisForm.curatorQ2.$touched = false;
			$scope.regisForm.creativeQ1.$touched = false;
			$scope.regisForm.pmQ1.$touched = false;
			}
		
		//Clear other sub group if change group
		$scope.checkDiv.subPM.select = null;
		$scope.checkDiv.subCr.select = null;
		$scope.checkDiv.subPR.select = null;
		$scope.checkDiv.subDP.select = null;
		
		//Set select value
		$scope.checkDiv.group.select = index;
		$scope.checkDiv.group.text = $scope.checkDiv.group.data[index];
		$scope.formData.group = $scope.checkDiv.group.val[index];
		$scope.formData.groupFull = $scope.checkDiv.group.text;
		
		$scope.subCase.subGroup.select = "sub"+$scope.checkDiv.group.val[index];
		
		//Check if this group have sub group
		if($scope.checkDiv.hasOwnProperty($scope.subCase.subGroup.select))
			{
			$scope.subCase.subGroup.text = $scope.checkDiv.group.data[index];
			$scope.subCase.subGroup.valid = false;
			}
		else
			{
			$scope.subCase.subGroup.select = null;
			$scope.subCase.subGroup.text = null;
			$scope.subCase.subGroup.valid = true;
			}
		
		//clear sub group data
		$scope.formData.subGroup = null;
		$scope.formData.subSubGroup = null;
		$scope.formData.subGroupFull = null;
		$scope.formData.subSubGroupFull = null;
		
		//clear sub sub group
		$scope.subCase.subSubGroup.select = null;
		$scope.subCase.subSubGroup.text = null;
		$scope.subCase.subSubGroup.valid = true;
		}
	
	$scope.selectSubGroup = function(index)
		{
		var subGroup = $scope.subCase.subGroup.select;
		
		//Clear other sub sub group if change sub group
		$scope.checkDiv.subPR.select = null;
		$scope.checkDiv.subDP.select = null;
		
		//Set select value
		$scope.checkDiv[subGroup].select = index;
		$scope.checkDiv[subGroup].text = $scope.checkDiv[subGroup].data[index];
		$scope.formData.subGroup = $scope.checkDiv[subGroup].val[index];
		$scope.formData.subGroupFull = $scope.checkDiv[subGroup].text;
		
		$scope.subCase.subGroup.valid = true;
		
		$scope.subCase.subSubGroup.select = "sub"+$scope.checkDiv[subGroup].val[index];
		
		//Check if this sub group have sub of sub group
		if($scope.checkDiv.hasOwnProperty($scope.subCase.subSubGroup.select))
			{
			$scope.subCase.subSubGroup.text = $scope.checkDiv[subGroup].data[index];
			$scope.subCase.subSubGroup.valid = false;
			}
		else
			{
			$scope.subCase.subSubGroup.select = null;
			$scope.subCase.subSubGroup.text = null;
			$scope.subCase.subSubGroup.valid = true;
			}
		$scope.formData.subSubGroup = null;
		$scope.formData.subSubGroupFull = null;
		}
	
	$scope.selectSubSubGroup = function(index)
		{
		var subSubGroup = $scope.subCase.subSubGroup.select;
		
		$scope.checkDiv[subSubGroup].select = index;
		$scope.checkDiv[subSubGroup].text = $scope.checkDiv[subSubGroup].data[index];
		$scope.formData.subSubGroup = $scope.checkDiv[subSubGroup].val[index];
		$scope.formData.subSubGroupFull = $scope.checkDiv[subSubGroup].text;
		
		$scope.subCase.subSubGroup.valid = true;
		}

	$scope.submitForm = function(formData)
		{
      	// console.log("TESt");
		$scope.submitted = true;
		
    	// console.log($scope.formData);
		if($scope.regisForm.$valid && $scope.formData.faculty != null && $scope.formData.department != null && $scope.dropdown.year.select != null && $scope.checkDiv.gender.select != null && $scope.checkDiv.group.select != null && $scope.subCase.subGroup.valid && $scope.subCase.subSubGroup.valid && (($scope.checkDiv.group.select == 0 && $scope.formData.pmQ1 != null) || ($scope.checkDiv.group.select == 1 && $scope.formData.curatorQ1 != null && $scope.formData.curatorQ2 != null) || ($scope.checkDiv.group.select == 2 && $scope.formData.creativeQ1 != null)))
			{
			$scope.warning = false;
			console.log($scope.formData);
			//Sent to DB API
      		return $http.post('/api/reg_sav', $scope.formData);
			}
		else
			{
			$scope.warning = true;
			$location.hash('top');
      		$anchorScroll();
			}
		}

}]);

var hContent = {
  en: {
    fp: "<strong>TEDxKMUTT</strong> is a group of students interested in creativity, ideas, and innovation." +
      " We host TEDx events to enrich our community with inspiring idea exchanges.",
    sp: "The TEDx Program is intended to help communities, organizations and individual spark " +
      "conversation and build connections through local TED-like experiences.",
    tp: "Now the TEDxKMUTT team needs your help. We are looking for well-motivated individuals " +
        "with high responsibility, who is passionate about transforming people and communities, " +
        "to join us. Apply now.",
  },
  th: {
    fp: "<strong>TEDxKMUTT</strong> คือกลุ่มนักศึกษา ที่มีความสนใจในการสร้างสรรค์และแลกเปลี่ยนไอเดียสู่การสร้างสรรค์  " +
     "นวัตกรรม พวกเราจัดงาน TEDx เพื่อแลกเปลี่ยนความคิดเพื่อการพัฒนาสังคม",
    sp: "TEDx ถูกสร้างขึ้นเพื่อช่วยเหลือชุมชน องค์กร และบุคคคล ที่มีพร้อมจะจุดประกายแรงบันดาลใจและ  " +
      "ประสบการณ์ ให้แก่คนในชุมชนท้องถิ่น ผ่านการสนทนา ทางโปรแกรมของ TEDx",
    tp: "ตอนนี้พวกเรากำลังมองหาบุคคลที่มีความสนใน TEDx มาเป็นส่วนหนึ่งใน TEDxKMUTT พวกเรากำลังมองหา  " +
      "บุคคลที่มีศัยกภาพ, ความรับผิดชอบ, และมีความหลงไหลใน TEDx หากคุณเป็นคนที่มีคุณสมบัติต่อไปนี้  " +
      "เพื่อมาเป็นส่วนหนึ่งของ TEDxKMUTT",
  }
};

var aContent = {
  fp: "<h4>What is TED</h4>"+
      "TED is a nonprofit organization devoted to Ideas Worth Spreading. Started as a "+
      "four-day conference in California 30 years ago, TED has grown to support its "+
      "mission with multiple initiatives. The two annual TED Conferences invite the "+
      "world's leading thinkers and doers to speak for 18 minutes or less. Many of "+
      "these talks are then made available, free, at TED.com.",
  sp: "<h4>About TED<sup>x</sup>, <span style=\"font-size:12px\"> x = independently organized event</span></h4>"+
      "In the spirit of ideas worth spreading, TEDx is a program of local," +
      " self-organized events that bring people together to share a TED-like"+
      " experience. At a TEDx event, TED Talks video and live speakers combine" +
      " to spark deep discussion and connection. These local, self-organized events"+
      " are branded TEDx, where x = independently organized TED event. The TED"+
      " Conference provides general guidance for the TEDx program, but individual"+
      " TEDx events are self-organized. (Subject to certain rules and regulations.)",

};

var init = function(){
  TweenMax.to("#main", 2.8, {css: {opacity:1,visibility:'visible'}});
};

init();

console.log('heroku deploy completed');
