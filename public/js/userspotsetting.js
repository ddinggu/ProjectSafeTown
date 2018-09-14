// marker를 담아두는 container를 생성하여 array에 따라 분할된 재활용가능한 markermaker function을 결합 
const markerContainer = {
    userSelectMarker : [],
    userArea : [],
    importedMarker : [],
    tutorialMarkers : []
}

// 로딩시 유저가 선택한 CCTV마커를 불러오기 위한 마커 생성 함수
function createUserCCTVMaker(location, id, options){
    var loadingMarker = new naver.maps.Marker({
         position: new naver.maps.LatLng(location[1], location[0]),
         map: map,
         title : `${id}@${options}`,
         icon: {
            content : '<div class="orangeDot">'+
                  '<img src="../image/orangedot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
                   +'</div>',
            size: new naver.maps.Size(40, 40),
            origin: new naver.maps.Point(0, 0)
             }
    });
    addInUserSpotEvent(loadingMarker);
    markerContainer.userSelectMarker.push(loadingMarker);
}

// 로그인시 회원의 데이터를 가져오는 용도
// $(window).on('load', function(){
//     $.get('/userimportcctv', function(data) {    
//         if(!data) return;
        
//         for(var i=0; i < data[0].dangerLocation.length; i++){
//               var userCheckLocation = data[0].dangerLocation[i]['geometry']['coordinates'];
//               var id = data[0].dangerLocation[i]['id'];
//               var options = data[0].dangerLocation[i]['options'];
//               console.log(`DB에서 불러와진 id값 : ${id}`);
            
//               createUserCCTVMaker(userCheckLocation, id, options);
//         }
//     });
// }); 

// 사용자의 선택에 따른 위험정보 등록시, 생성되야하는 주황색 마커를 생성하기 위한 마커함수
function createUserMaker(locationId, options){
  var locationMarker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    title : `${locationId}@${options}`,
    map: map,
    icon: {
      content : '<div class="orangeDot">'+
                  '<img src="../image/orangedot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
                   +'</div>',
       size: new naver.maps.Size(40, 40),
       origin: new naver.maps.Point(0, 0)
        }
  });

  addInUserSpotEvent(locationMarker);
  markerContainer.userSelectMarker.push(locationMarker);
}

// 로그인된 회원의 등록위치정보 마커들을 클릭할 시 기존에 등록한 값을 찾아서 style을 부여한다.
function addInUserSpotEvent(marker){
    naver.maps.Event.addListener(marker, 'click', (e) => {
      console.log(e);

      map.setZoom(14);
      map.setCenter({lat : e.coord._lat, lng : e.coord._lng});
      locationId = e.overlay.title.split('@')[0];
      var appliedOptions = e.overlay.title.split('@')[1];
      console.log(locationId);
      
      if(!$('.options').length) {
          showLocationInfo(marker.getElement().childNodes[0]); // mapsetting.js
          effectUserChoosenData(appliedOptions);
      } 
      else {
          deleteLocationInfo();
          showLocationInfo(marker.getElement().childNodes[0]); // mapsetting.js
          effectUserChoosenData(appliedOptions);
      }
    });
}

// 마커의 등록된 title값을 확인하여 정보가 들어있는곳에 css 처리를 담당.
function effectUserChoosenData(options){
    $('.options').each(function(){
        $(this).is(`#${options}`) ? $(this).toggleClass('toggleEffect') : null;
    })
}
