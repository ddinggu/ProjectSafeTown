$(document).ready(function(){
  $("#menuIcon").click(function(){
    /*$("#sideNav")[0].classList.toggle("visible");*/
     $("#sideNav")[0].style.width = "250px";
  });
  $("#closeBtn").click(function(){
    $("#sideNav")[0].style.width = 0;
  })

  // 경진 - testing
  $('.navMenu').click(function(){
    $('#userform').css('z-index','101');
  })

  $('body').on('click','.options',function(e){
    e.preventDefault();
    // 버튼 클릭시 backgroud color 애니매이션 활용
    $(this).toggleClass('toggleEffect');
    
    var dangerData; 
    dangerData = $(this).children().html().split('<br>').join(' ');
    console.log(window.locationId);
    
    var locationInfo = {
      "locationId" : window.locationId,
      "dangerData" : dangerData,
      "geolocation" : [window.lng,window.lat],
      "flag" : $('.toggleEffect').length
  };   
    console.log(dangerData);
    
    
    $.post('/pushDangerSpot', locationInfo , function(data){
        alert(data);
    });
  })

});
