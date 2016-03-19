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
	$scope.formData.prefix = "--";
	$scope.formData.name;
	$scope.formData.lastname;
	$scope.formData.nickname;
	$scope.formData.age;
	$scope.formData.gender;
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

	//Is Submit button hit?
	$scope.submitted = false;

	//Dropdown data
	$scope.dropdown = {};

	$scope.dropdown.prefix = {};
	$scope.dropdown.prefix.data = ["นาย","นาง","นางสาว"];
	$scope.dropdown.prefix.val = [];
	$scope.dropdown.prefix.select = null;

	$scope.dropdown.faculty = {};
	$scope.dropdown.faculty.data = ["คณะวิศวกรรมศาสตร์","คณะวิทยาศาสตร์","คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี","คณะเทคโนโลยีสารสนเทศ","คณะสถาปัตยกรรมศาสตร์และการออกแบบ","สถาบันวิทยาการหุ่นยนต์ภาคสนาม","วิทยาลัยสหวิทยาการ"];
	$scope.dropdown.faculty.val = ["Eng","Sci","Ind","IT","Arch","FIBO","MultiSci"];
	$scope.dropdown.faculty.select = null;
	
	$scope.dropdown.depEng = {};
	$scope.dropdown.depEng.data = ["วิศวกรรมเคมี","วิศวกรรมเครื่องกล","วิศวกรรมไฟฟ้า","วิศวกรรมโยธา","วิศวกรรมอุตสาหการและเมคคาทรอนิกส์","วิศวกรรมคอมพิวเตอร์","วิศวกรรมระบบควบคุมและเครื่องมือวัด","วิศวกรรมสิ่งแวดล้อม","วิศวกรรมไฟฟ้าสื่อสารและอิเล็กทรอนิกส์","วิศวกรรมวัสดุและเครื่องมือ"];
	$scope.dropdown.depEng.val = ["CHM","ME","EE","CE","PEMCE","CPE","INC","ENV","ENE","TME"];
	$scope.dropdown.depEng.select = null;
	
	$scope.dropdown.depSci = {};
	$scope.dropdown.depSci.data = ["คณิตศาสตร์","เคมี","ฟิสิกส์ประยุกต์","จุลชีววิทยา","วิทยาการคอมพิวเตอร์ประยุกต์","สถิติ","วิทยาศาสตร์และเทคโนโลยีการอาหาร"];
	$scope.dropdown.depSci.val = ["MTH","CHE","PHY","MIC","CS","STA","FS"];
	$scope.dropdown.depSci.select = null;
	
	$scope.dropdown.depInd = {};
	$scope.dropdown.depInd.data = ["เทคโนโลยีการพิมพ์และบรรจุภัณฑ์","เทคโนโลยีอุตสาหกรรม","วิทยาการคอมพิวเตอร์ประยุกต์-มัลติมีเดีย","วิศวกรรมเครื่องกล","วิศวกรรมไฟฟ้า","วิศวกรรมโยธา","วิศวกรรมอุตสาหการ","เทคโนโลยีการศึกษาและการสื่อสารมวลชน","เทคโนโลยีมีเดีย","มีเดียอาตส์","มีเดียทางการแพทย์และวิทยาศาสตร์"];
	$scope.dropdown.depInd.val = ["PRI","InT","CM","ME","EE","CE","PE","EDU","MET","MEA","MES"];
	$scope.dropdown.depInd.select = null;
	
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
	
	$scope.dropdown.depMultiSci = {};
	$scope.dropdown.depMultiSci.data = ["วิทยาศาสตร์และเทคโนโลยี"];
	$scope.dropdown.depMultiSci.val = ["ST"];
	$scope.dropdown.depMultiSci.select = null;

	$scope.dropdown.year = {};
	$scope.dropdown.year.data = ['1','2','3','4'];
	$scope.dropdown.year.select = null;

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
	$scope.checkDiv.group.icon = ["archive","user","paint-brush"];
	$scope.checkDiv.group.select = null;
	
	$scope.checkDiv.subPM = {};
	$scope.checkDiv.subPM.data = ["Sponsor","Finance","Support","Documentation","Contractor"];
	$scope.checkDiv.subPM.val = ["Spo","Fin","Sup","Doc","Con"];
	$scope.checkDiv.subPM.icon = [];
	$scope.checkDiv.subPM.select = null;
	
	$scope.checkDiv.subCr = {};
	$scope.checkDiv.subCr.data = ["Public Relation","Digital Production","Stage","Activity"];
	$scope.checkDiv.subCr.val = ["PR","DP","Sta","Act"];
	$scope.checkDiv.subCr.icon = [];
	$scope.checkDiv.subCr.select = null;
	
	$scope.checkDiv.subPR = {};
	$scope.checkDiv.subPR.data = ["Creative","Marketing","Graphic Design","Copy Writing"];
	$scope.checkDiv.subPR.val = ["Cre","Mar","GD","CW"];
	$scope.checkDiv.subPR.icon = [];
	$scope.checkDiv.subPR.select = null;
	
	$scope.checkDiv.subDP = {};
	$scope.checkDiv.subDP.data = ["Photographs","Video Recording","Process Monitoring"];
	$scope.checkDiv.subDP.val = ["Pho","Vid","PMo"];
	$scope.checkDiv.subDP.icon = [];
	$scope.checkDiv.subDP.select = null;

	//Select dropdown list
	$scope.selectOption = function(type,name,index)
		{
		$scope[type][name].select = index;
		$scope.formData[name] = $scope[type][name].val[index];
		}

	$scope.submitForm = function(formData)
		{
      // console.log("TESt");
		$scope.submitted = true;
    // console.log($scope.formData);
		if($scope.regisForm.$valid && $scope.dropdown.prefix.select != null && $scope.dropdown.faculty.select != null && $scope.dropdown.year.select != null && $scope.checkDiv.gender.select != null && $scope.checkDiv.group.select != null)
			{
			console.log($scope.formData);
			//Sent to DB API
      return $http.post('/api/reg_sav', $scope.formData);
			}
		else
			{
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
