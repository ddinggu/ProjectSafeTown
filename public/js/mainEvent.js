function createTutorialCCTVMaker(location){
  var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(location[1], location[0]),
    map: map,
    icon: {
        content : '<div id="sampledanger">'+
              '<img src="../image/orangedot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
              +'</div>',
        size: new naver.maps.Size(30, 32),
        origin: new naver.maps.Point(0, 0)
    }
  });
  markerContainer.tutorialMarkers.push(marker);
}

// 튜토리얼 
var arrLang = {
  "en-us": {
    "navMenuLogin" : "Login",
    "navMenuIntro" : "Introduction",
    "navMenuHowTo" : "How to Use",
    "navMenuRR" : "Ratings & Reviews",
    "tutorial1" : "Areas that CCTV cover are marked with green circles.",
    "tutorial2" : "Crime-ridden areas are marked with orange circles. You can participate in reporting crime-ridden areas.",
    "tutorial3" : "You can tap where you feel unsafe.",
    "tutorial4-1" : "Orange location icon is appeared.",
    "tutorial4-2" : "Tap the icon!",
    "tutorial5" : "You can choose option(s) to report why you feel unsafe here.",
    "tutorial6" : "You can find a safer path more likely to be covered by CCTVs and/or less likely to be reported as crime-ridden areas.",
    "firstOption" : "Lonesome road",
    "secondOption" : "Too Dark",
    "thirdOption" : "There was an incident",
    "fourthOption" : "Red-light district",
    "fifthOption" : "Etc"
  },
  "ko": {
    "navMenuLogin" : "로그인",
    "navMenuIntro" : "소개",
    "navMenuHowTo" : "사용방법",
    "navMenuRR" : "사용후기",
    "tutorial1" : "CCTV가 설치되어있는 곳은 초록색으로 표시되어있어요.",
    "tutorial2" : "위험하게 느껴지는 곳은 주황색으로 표시되어있어요. 여러분이 직접 표시할 수 있어요.",
    "tutorial3" : "길을 가다 위험해보이는 곳이 있다면, 눌러주세요.",
    "tutorial4-1" : "주황색 위치 아이콘이 생겼어요.",
    "tutorial4-2" : "아이콘을 눌러보세요!",
    "tutorial5" : "이곳이 왜 위험하게 느껴지는지 선택할 수 있어요.",
    "tutorial6" : "CCTV가 설치되어 있거나 위험하게 느껴지는 곳을 최대한 피한, 안전한 길로 안내 받을 수 있어요.",
    "firstOption" : "인적이 드물어요",
    "secondOption" : "어두워요",
    "thirdOption" : "사고가 난 적 있어요",
    "fourthOption" : "유흥가에요",
    "fifthOption" : "기타"
  }
};

var lang = "ko";
// Check for localStorage support (On reload, show the website based on previous setting)
if("localStorage" in window){
    var usrLang = localStorage.getItem("uiLang");
        if(usrLang) {
            lang = usrLang
        }
}

$(document).ready(function(){

  // * language setting START
  $(".lang").each(function(index, element) {
    $(this).text(arrLang[lang][$(this).attr("key")]);
  });
    
  // get/set the selected language
  // what happens after clicking the "English" or "한국어" button
  $(".translate")
      .on({
          click : function() {
              var lang = $(this).attr("id");
      
              // update localStorage key
              if("localStorage" in window){
                  localStorage.setItem("uiLang", lang);
                  // console.log( localStorage.getItem('uiLang') );
              }
              $(".lang").each(function(index, element) {
                $(this).text(arrLang[lang][$(this).attr("key")]);
              });
          }
      });

// Navibar event 설정 
  $("#menuIcon").click(function(){
    /*$("#sideNav")[0].classList.toggle("visible");*/
     $("#sideNav")[0].style.width = "450px";
  });
  
  $("#closeBtn").click(function(){
    $("#sideNav")[0].style.width = 0;
  })

  // show sign-up/login/delete_account sections when "login" is clicked 
  $('#userAccess').click(function(){
    $('#userform').css('z-index','101');
  })

  // START OF TUTORIAL
  // tutorial page 1 : safe areas
  $('#tutorialMenu').click(function(){
    $("#sideNav")[0].style.width = "0px";
    $("#mapBackground").fadeIn();
    $("#tutorialGreen").fadeIn();
    $(".tutorialSafe").fadeIn();

    // 튜토리얼을 보기위한 버튼 클릭시 튜토리얼 위치로 이동 및 튜토리얼 데이터(주황색 마커) 생성
    $.get('/tutorialdata', function(data) {    
      for(var i=0; i < data[0].dangerLocation.length; i++){
          var userCheckLocation = data[0].dangerLocation[i]['geometry']['coordinates'];
          createTutorialCCTVMaker(userCheckLocation);
      }
    });
    map.setZoom(14);
    map.setCenter({lat : 37.6013032, lng : 127.0662603});
  });

  // tutorial page 2 : crime-ridden areas
  $('#mapBackground').click(function(){
    $("#tutorialGreen").fadeOut();
    $("#mapBackground").fadeOut();
    $(".tutorialSafe").fadeOut();

    $(".tutorialNotSafe").fadeIn();
    $("#mapBackground2").fadeIn();
    $("#tutorialOrange").fadeIn();
  });

  // tutorial page 3 : tab the map!
  $('#mapBackground2').click(function(){
    $("#mapBackground2").fadeOut();
    $("#tutorialOrange").fadeOut();
    $(".tutorialNotSafe").fadeOut();

    $("#mapBackground3").fadeIn();
    $("#tutorialTab").fadeIn();
  });

  // tutorial page 4 : orange icon is appeared!
  $('#mapBackground3').click(function(){
    $("#mapBackground2").fadeOut();    
    $("#tutorialTab").fadeOut();    

    $("mapBackground4").fadeIn();
    $("#tutorialOrangeSpot").fadeIn();
    $("#tutorialOrangeIcon1").fadeIn();
    $("#tutorialOrangeIcon2").fadeIn();
  });

  // tutorial page 5 : crime-ridden areas report options
  $('#tutorialOrangeSpot').click(function(){
    $("#mapBackground3").fadeOut();
    $("#tutorialOrangeIcon1").fadeOut();
    $("#tutorialOrangeIcon2").fadeOut();

    $("#mapBackground5").fadeIn();
    $("#tutorialOptionsExplanation").fadeIn();
    $("#tutorialOption1").fadeIn();
    $("#tutorialOption2").fadeIn();
    $("#tutorialOption3").fadeIn();
    $("#tutorialOption4").fadeIn();
    $("#tutorialOption5").fadeIn();
  });

  // tutorial page 6 : find a safer path!
  $('#mapBackground5').click(function(){
    $("#mapBackground4").fadeOut();
    $("#mapBackground5").fadeOut();
    $("#tutorialOrangeSpot").fadeOut();
    $("#tutorialOptionsExplanation").fadeOut();
    $("#tutorialOption1").fadeOut();
    $("#tutorialOption2").fadeOut();
    $("#tutorialOption3").fadeOut();
    $("#tutorialOption4").fadeOut();
    $("#tutorialOption5").fadeOut();

    $("#mapBackground6").fadeIn();
    $("#tutorialSaferPath").fadeIn();
  });  

  // END OF TUTORIAL
  $('#mapBackground6').click(function(){
    $("#mapBackground5").fadeOut();
    $("#mapBackground6").fadeOut();
    $("#tutorialSaferPath").fadeOut();

    // 튜토리얼이 끝나면 튜토리얼용 마커들을 제거 
    removeAllCCTVMaker(markerContainer.tutorialMarkers);

  });  
  // tutorial page 6 ends
});
