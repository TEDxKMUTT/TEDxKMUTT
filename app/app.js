var app = angular.module('tedxkmutt', ['ngSanitize','ngRoute']);

app.controller('homeController', function($scope, $sce) {
  $scope.content = item.en;
  clang = 'en';

  $scope.lang = function(changeLang) {
    if (changeLang == 'en') {
      clang = 'en';
      $scope.content = item.en;
      console.log("lang en");
    } else {
      clang = 'th';
      $scope.content = item.th;
      console.log("lang th");
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

app.controller('date', function($scope) {
  this.dates = new Date();
  $scope.year = this.dates.getFullYear();
});

app.controller('regController',function($scope){
  $('.content').addClass('clear');
});

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: "app/template/home.html",
    controller: 'homeController',
    controllerAs: 'home'
  })
  .when('/registration',{
    templateUrl: "app/template/registration.html",
    controller: 'regController',
    controllerAs: 'reg'
  })
  .otherwise({ redirectTo: '/'});

});



var item = {
  en: {
    fp: "<strong>TEDxKMUTT</strong> is a group of student who interested in creativity and idea exchange to  develop community." +
      " We host TEDx events to share an intention for improving our society.",
    sp: "The TEDx Program is designed to help communities, organizations and individuals " +
      "to spark conversation and connection through local TED-like experiences.",
    tp: "Now, We need someone who are interested in TEDx to be a part of our team.  " + " We want individuals who have high potential, high responsibility, and positive passion.  " +
      "If you have all that we are looking for, apply with confidence.",
  },
  th: {
    fp: "<strong>TEDxKMUTT</strong> คือกลุ่มนักศึกษา ที่มีความสนใจในการสร้างสรรค์และแลกเปลี่ยนไอเดียสู่การสร้างสรรค์  " + "นวัตกรรม พวกเราจัดงาน TEDx เพื่อแลกเปลี่ยนความคิดเพื่อการพัฒนาสังคม",
    sp: "TEDx ถูกสร้างขึ้นเพื่อช่วยเหลือชุมชน องค์กร และบุคคคล ที่มีพร้อมจะจุดประกายแรงบันดาลใจและ  " +
      "ประสบการณ์ ให้แก่คนในชุมชนท้องถิ่น ผ่านการสนทนา ทางโปรแกรมของ TEDx",
    tp: "ตอนนี้พวกเรากำลังมองหาบุคคลที่มีความสนใน TEDx มาเป็นส่วนหนึ่งใน TEDxKMUTT พวกเรากำลังมองหา  " +
      "บุคคลที่มีศัยกภาพ, ความรับผิดชอบ, และมีความหลงไหลใน TEDx หากคุณเป็นคนที่มีคุณสมบัติต่อไปนี้  " +
      "กดปุ่ม BE A VOLUNTEER เพื่อมาเป็นส่วนนึงของ TEDxKMUTT",
  }
};

var init = function(){
  TweenMax.to("#main", 2.8, {css: {opacity:1,visibility:'visible'}});
};

init();
