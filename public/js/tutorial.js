// 주황색 마커 (튜토리얼 데이터 마커)를 삽입하는 function
var tutorialMarkers = [];

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

    tutorialMarkers.push(marker);
}

// 튜토리얼을 보기위한 버튼 클릭시 튜토리얼 위치로 이동 및 튜토리얼 데이터(주황색 마커) 생성
$('#tutorialOn').on('click', function(){
    $.get('/tutorialdata', function(data) {    
        for(var i=0; i < data[0].dangerLocation.length; i++){
            var tutorialLocation = data[0].dangerLocation[i]['geometry']['coordinates'];
            createTutorialCCTVMaker(tutorialLocation);
        }
    });

    map.setZoom(14);
    map.setCenter({lat : 37.6013032, lng : 127.0662603});
}); 


// 튜토리얼이 끝나면 튜토리얼용 마커들을 제거 
$('#tutorialEnd').on('click', function(){
    tutorialMarkers.forEach(function(el){
        el.setMap(null);
    })
})

