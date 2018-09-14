// 기본 위치인 서울시청으로 먼저 맵을 뿌려준다
// 만약 기본 맵이 뿌려지지 않는다면, scope로 인해 Map object를 이용한 모든 method를 사용할 수 없다.
var map;
map = new naver.maps.Map('map', 
            {
            zoom: 11,
            mapTypeId: naver.maps.MapTypeId.NORMAL,
            minZoom : 9,
            maxZoom : 14
            }
);

// 전역변수로 GPS Option값 설정
const userLocateOption = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: Infinity
};

//-------------------------- GPS(사용자 위치 파악) 버튼 생성 --------------------------------

//customControl 객체를 이용하여 gps 활성화 및 위치 이동
(function attachGpsController(){
    var locationBtnHtml = '<div style="position: relative; left : 4px;"><a href="#"><img src="../image/position.png" width="40px" height="40px"></img></a></div>';

    var gpsControler = new naver.maps.CustomControl(locationBtnHtml, {
        position: naver.maps.Position.RIGHT_TOP
    });

    gpsControler.setMap(map);

    naver.maps.Event.addDOMListener(gpsControler.getElement(), 'click', function() {
        console.log('gps click event');
        
        navigator.geolocation.getCurrentPosition(userLocateAcceptSuccess, userLocateAcceptFailed, userLocateOption);
    });
})();

// 순서상 문제에 의해 줌 컨트롤러를 map 객체에서 이용하는 것이 아닌, 뒤에서 따로 설정해준다.
(function attachZoomController(){
    var zoomControl = new naver.maps.ZoomControl({
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_TOP
    });

    zoomControl.setMap(map);
})();

(function(){
    var marker = new naver.maps.Marker({
        position : new naver.maps.LatLng(37.5666805, 126.9784147),
        map : map,
        icon: {
            content : '<div id="orangeMarker">'+
            '<img src="../image/orangespot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
                        +'</div>',
            size: new naver.maps.Size(30, 40),
            origin: new naver.maps.Point(0, 0)
        }
    })

    // 마커 옮기는 리스너 세팅 (marker와 map을 scope때문에 받아 올 수 없기 때문에 마커를 기본적으로 세팅)
    naver.maps.Event.addListener(map, 'click', function(e) {
        
        marker.setPosition(e.coord);
        console.log(marker.getPosition());
        
        // 전역변수이므로 주의!!!!!!!!!!!
        window.lat = e.coord._lat;
        window.lng = e.coord._lng;
        window.locationId = parseFloat(e.coord._lat) + parseFloat(e.coord._lng);

        deleteLocationInfo();
    });

    // 마커를 클릭하면 설정한 Zoom과 중앙으로 이동
    naver.maps.Event.addListener(marker, 'click', function(e) {

        map.setZoom(14);
        map.setCenter(marker.getPosition());

        if(!$('.options').length) showLocationInfo('#orangeMarker');
        else deleteLocationInfo();
    });
})();

// 선택 박스 5개 생성 및 삭제 함수
function showLocationInfo(friendNode){
    $(friendNode).after($('<div class="options withoutInput" id="option1">인적이<br>드물어요</div>'));
    $(friendNode).after($('<div class="options withoutInput" id="option2">어두워요</div>'));
    $(friendNode).after($('<div class="options withoutInput" id="option3">사고가<br>난 적<br>있어요</div>'));
    $(friendNode).after($('<div class="options withoutInput" id="option4">유흥가에요</div>'));
    $(friendNode).after($('<div class="options withInput" id="option5">기타</div>'));  
}

function deleteLocationInfo() {
    $('.options').each(function(){
        $(this).remove();
    })
}


// //------------------ 드래그 할때마다 유동적으로 CCTV 정보를 불러오기 위한 설정 (사용될 필요 없어짐)---------------
// // 동적 마커 표시 역활( 드래그할때 마커를 움직이게 하기 위해 마커를 담아 놓는 리스트 )
// var markers = [];
// // 위도, 경도에 따른 셀리 마커를 찍는 함수
// function createCCTVMaker(location){
//     var marker = new naver.maps.Marker({
//          position: new naver.maps.LatLng(location[1], location[0]),
//          map: map,
//          icon: {
//             content : '<div class="safeDot">'+
//                   '<img src="../image/skyspot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
//                    +'</div>',
//             size: new naver.maps.Size(30, 32),
//             origin: new naver.maps.Point(0, 0)
//              }
//     });

//     markers.push(marker);
// }

// // idle은 지도의 움직임이 종료 되었을때, 이벤트가 발생하게 된다.
// naver.maps.Event.addListener(map, 'idle', function() {
//     updateMarkers(map, markers);
// });

// function updateMarkers(map, markers) {
//     var mapBounds = map.getBounds();
//     var marker, position;

//     for(var i = 0; i < markers.length; i++) {
//         marker = markers[i]
//         position = marker.getPosition();

//         if (mapBounds.hasLatLng(position)) showMarker(map, marker)
//         else hideMarker(map, marker);
//     }
// }

// function showMarker(map, marker) {
//     if (marker.getMap()) return;
//     marker.setMap(map);
// }

// function hideMarker(map, marker) {
//     if (!marker.getMap()) return;
//     marker.setMap(null);
// }

// //-------------------------- 유동적인 CCTV 마커 불러오기 끝----------------------------
