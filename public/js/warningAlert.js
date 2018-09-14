$(window).on('load', function () {
    if (!navigator.geolocation) return;
    navigator.geolocation.watchPosition(userLocateAcceptSuccess, userLocateAcceptFailed, userLocateOption)
});

function userLocateAcceptSuccess(position) {
    if (markerContainer.userArea.length) {
        removeAllCCTVMaker(markerContainer.userArea);
    }

    let coords = { lat: position.coords.latitude, 
                   lng : position.coords.longitude };    
    console.log(`lat : ${coords.lat}  lng : ${coords.lng}`);

    map.setCenter(new naver.maps.LatLng(coords.lat, coords.lng)); // 사용자 위치 중심으로 지도를 이동
    map.morph(new naver.maps.LatLng(coords.lat, coords.lng), 12); // Zoom 땡기기

    currentLocationMarker(coords);
    headingController(position.coords);
    getStoredCCTVdata(coords);
}

function userLocateAcceptFailed(error) {
    var errorCode = error.code;
    if (errorCode) alert('위치정보사용에 동의해주세요');
    else if (errorCode === 2) alert('지역을 찾을 수 없습니다. 다시 시도해 주세요')
    else alert('알 수 없는 오류입니다. 다시 시도해 주세요')
}

////////////////////////// 테스트용 ////////////////////////////////////////
$('#tester').on('click', getStoredCCTVdata);
////////////////////////////////////////////////////////////////////////

function getStoredCCTVdata(coords) {
    $.get('storedaroundcctv', coords, (data) => {
        if (!data.result) {
            console.log(data.comment.errmsg);
        }
        else if (data.result === 2) {
            console.log('%c'+data.comment,'color : red; font-size : 1.6em ; padding : 5px; ');
        }
        else {
            removeAllCCTVMaker(markerContainer.importedMarker);
            data.item.forEach(el => {
                let coordVal = el.geometry.coordinates;
                createCCTVMaker(coordVal);
            });
        }
    })
}

function createCCTVMaker(coordinateValue) {
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(coordinateValue[1], coordinateValue[0]),
        map: map,
        icon: {
            content: '<div class="safeDot">' +
                '<img src="../image/skyspot.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
                + '</div>',
            size: new naver.maps.Size(25, 27),
            origin: new naver.maps.Point(0, 0)
        }
    });

    console.log('%c push success!', "color : blue; font-style : italic; padding : 3px ");
    markerContainer.importedMarker.push(marker);
}

// GPS를 통한 현 사용자 위치의 마커 찍기
function currentLocationMarker(coords) {
    var mylocation = new naver.maps.Marker({
        position: new naver.maps.LatLng(coords.lat, coords.lng),
        map: map,
        icon: {
            content: '<div id="userHere">' +
            '<img src="../image/here.png" alt="" style="margin: 0px; padding: 0px; width: 22; height: 22;  border: 0px solid transparent; display: block; max-width: none; max-height: none;">'
            + '</div>',
            size: new naver.maps.Size(22, 22),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 26),
        }
    });

    markerContainer.userArea.push(mylocation);
}

// 사용자의 방향에 따른 방향 변경 
function headingController(coords){
    const userHereSpot = $('#userHere');
    let heading = coords.heading === null ? 0 : coords.heading;
    console.log(`기기회전 : ${heading} degree`);

    userHereSpot.css('transform', `rotate(${heading}deg)`)
}

// map에 셋팅된 특정 CCTVMarker를 모두 지우는 기능을 하는 함수.
function removeAllCCTVMaker(array){
    array.forEach(el => { el.setMap(null); })
    array.length = 0;
}


// ajax.get(
//     function(req,res){   //서버와 통신  

//         //requset구현부//    
//         let cctvRes = res.firstRes ;  
//         let dangetSpotRes = res.secondRes;   

//         //animation if else   
//         if(cctvRes || dangerSpotRes){     
//             alertAni(cctvRes, dangerSpotRes);   
//         } else{ 
//             safeAni();  
//         } 
//     }
// );
