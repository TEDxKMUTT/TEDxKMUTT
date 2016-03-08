var app = angular.module('app', ['ngSanitize']);

app.controller('renderText', function($scope, $sce) {
  this.content = item.en;

  clang = 'en';

  this.lang = function(changeLang) {
    if (changeLang == 'en') {
      clang = 'en';
      this.content = item.en;
    } else {
      clang = 'th';
      this.content = item.th;
    };
  };

  this.isLang = function(chk) {
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


var item = {
  en: {
    fp: "<strong>TEDxKMUTT</strong> is a group of student who interested in creativity and idea exchange to <br>develop community." +
      "We host TEDx events to share an intention for improving our society.",
    sp: "The TEDx Program is designed to help communities, organizations and individuals <br>" +
      "to spark conversation and connection through local TED-like experiences.",
    tp: "Now, We need someone who are interested in TEDx to be a part of our team. <br>" + "We want individuals who have high potential, high responsibility, and positive passion. <br>" +
      "If you have all that we are looking for, apply with confidence.",
    coming: "COMING SOON..."
  },
  th: {
    fp: "<strong>TEDxKMUTT</strong> คือกลุ่มนักศึกษา ที่มีความสนใจในการสร้างสรรค์และแลกเปลี่ยนไอเดียสู่การสร้างสรรค์ <br>" + "นวัตกรรม พวกเราจัดงาน TEDx เพื่อแลกเปลี่ยนความคิดเพื่อการพัฒนาสังคม",
    sp: "TEDx ถูกสร้างขึ้นเพื่อช่วยเหลือชุมชน องค์กร และบุคคคล ที่มีพร้อมจะจุดประกายแรงบันดาลใจและ <br>" +
      "ประสบการณ์ ให้แก่คนในชุมชนท้องถิ่น ผ่านการสนทนา ทางโปรแกรมของ TEDx",
    tp: "ตอนนี้พวกเรากำลังมองหาบุคคลที่มีความสนใน TEDx มาเป็นส่วนหนึ่งใน TEDxKMUTT พวกเรากำลังมองหา <br>" +
      "บุคคลที่มีศัยกภาพ, ความรับผิดชอบ, และมีความหลงไหลใน TEDx หากคุณเป็นคนที่มีคุณสมบัติต่อไปนี้ <br>" +
      "กดปุ่ม Join Volenteer เพื่อมาเป็นส่วนนึงของ TEDxKMUTT",
    coming: "เร็วนี้ๆ..."
  }
};
