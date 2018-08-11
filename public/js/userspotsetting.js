var userMarkers = [];
// 위도, 경도에 따른 셀리 마커를 찍는 함수
function createUserCCTVMaker(location){
    var marker = new naver.maps.Marker({
         position: new naver.maps.LatLng(location[1], location[0]),
         map: map,
         icon: {
            content : '<div id="orangeDot">'+
                  '<img src="../image/orangedot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
                   +'</div>',
            size: new naver.maps.Size(40, 40),
            origin: new naver.maps.Point(0, 0)
             }
    });

    userMarkers.push(marker);
}

$(window).on('load', function(){
    $.get('/userimportcctv', function(data) {    
        if(!data) return;
        
        for(var i=0; i < data[0].dangerLocation.length; i++){
            var userCheckLocation = data[0].dangerLocation[i]['geometry']['coordinates'];
            createUserCCTVMaker(userCheckLocation);
        }
        console.log(data);
    });
}); 

// 사용자의 선택에 따른 위험정보 등록시, 생성되야하는 주황색 마커를 생성하기 위한 마커함수
var userSelectMarker = [];
function createUserMaker(lat, lng, locationId){
  var locationMarker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    title : lat+','+lng+','+locationId,
    map: map,
    icon: {
      content : '<div class="orangeDot">'+
                  '<img src="../image/orangedot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
                   +'</div>',
       size: new naver.maps.Size(40, 40),
       origin: new naver.maps.Point(0, 0)
        }
  });

  userSelectMarker.push(locationMarker);
}

// // 스코프 문제 아 미치겠다.. 
// // 로그인된 회원의 등록위치정보 마커들을 클릭할 시 기존에 등록한 값을 찾아서 style을 부여한다.

// naver.maps.Event.addListener(locationMarker,'click',function(e){

//   if(!$('.options').length) showLocationInfo('.orangeDot');
//   else deleteLocationInfo();
  
//   var markerLoactionInfo = e.overlay.title.split(',');
   
//   // 맵을 클릭했을때의 정보들이 계속 유지 되면 문제가 발생하게 된다. 
//   // 따라서, 각 마커에 정해진 좌표값과 id값으로 전역변수들을 바꿔줘야 한다. 
  
//   window.lat = markerLoactionInfo[0];
//   window.lng = markerLoactionInfo[1];
//   window.locationId = markerLoactionInfo[2];

//   $.get('/spotInfo/'+window.locationId, function(data){

//     $('.options').each(function(){
//         if( $(this).text() === data ) {
//           console.log('텍스트 구분 성공');
//           $(this).addClass('toggleEffect');
//       }
//     })
//   })

// })

// 위험 지역 버튼을 클릭시 DB로 전송 
$('body').on('click','.options',function(e){
    e.preventDefault();
    
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
    
    // 클릭 이벤트안에서 사용자가 선택한  정보를 서버로 연결하는 라우터
    $.post('/dangerSpot', locationInfo , function(data){
      if(data.result === 1) {
        e.currentTarget.classList.add('toggleEffect');
        createUserMaker(window.lat, window.lng, locationInfo.locationId);
      }
      else if(!data.result) {
        e.currentTarget.classList.remove('toggleEffect');
        // 우선적으로 방금전에 생성한 마커만 지우는 것만 확인
        userSelectMarker[0].setMap(null);
      }
      else return alert(data.comment);;
      alert(data.comment);  
    });
    
  })