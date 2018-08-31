// Promise 기반 button event(DB 연동) 생성.

$('body').on('click', '.withoutInput', function(e) {
    let clickElement = $(this);
    let buttonFlag = $('.toggleEffect').length;
    let dangerData = clickElement.html().split('<br>').join(' ');
    console.log(window.locationId);
    let choosenOptions = e.target.id;
    
    let locationInfo = {
      "locationId" : window.locationId,
      "dangerData" : dangerData,
      "geolocation" : [window.lng,window.lat],
      "flag" : buttonFlag,
      "options" : choosenOptions
    };   
    
    if(!buttonFlag){
        returnData(locationInfo)
        .then((result) => {
           if(result === 404) userUnLoginAlarm()
           else{
              dataRecordedAlarm()
              .then(() => {      
                 clickElement.toggleClass('toggleEffect');
              })
            }
        })
        .catch((err) =>{ 
            console.error(err) 
        });
    }
    else{
        if(clickElement.hasClass('toggleEffect')){
            deleteConfigAlarm()
            .then((result) => {
                if(result.value){
                    deleteCompleteAlram()
                    .then(() => {
                        returnData(locationInfo);
                        clickElement.toggleClass('toggleEffect');
                    });
                }
            });
        }
        else{
            duplicateDataAlarm();
        }
    }
});

$('body').on('click', '.withInput', async function(e) {
    let clickElement = $(this);
    let buttonFlag = $('.toggleEffect').length;
    let dangerData = clickElement.html().split('<br>').join(' ');
    console.log(window.locationId);
    let choosenOptions = e.target.id;
    
    let locationInfo = {
      "locationId" : window.locationId,
      "dangerData" : dangerData,
      "geolocation" : [window.lng,window.lat],
      "flag" : buttonFlag,
      "options" : choosenOptions
    };   

    if(!buttonFlag){
        const {value: text} = await swal({
            title: 'Why do you feel unsafe here?',
            // title: arrLang[lang]['textboxMsgTitle'],
            input: 'text',
            inputPlaceholder: 'Type your message :)',
            // inputPlaceholder: arrLang[lang]['textboxMsgInputPlaceholder'],
            customClass: 'swal2-textbox-msg',
            showCancelButton: true,
            confirmButtonColor: '#9FEDDA',
            confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>',
            cancelButtonColor: '#F3C78D',
            cancelButtonText: '<div id="swal2-cancelBtnTxt" style="color:#000000">Cancel</div>',
            backdrop: `
                rgba(211,211,211,0.4) 
                center left
                no-repeat
            `,
            inputValidator: (value) => {
                return !value && arrLang[lang]['textboxMsgInputValidator']
            }
        });
        
        if (text) {
            if(text.length > 50){
                toastAlarm();
            }
            else{
                swal({
                    text: `Your entered : "${text}"`,
                    // text: arrLang[lang]['textboxMsgValidationMsg'] + ` : "${text}"`,
                    backdrop: `
                    rgba(211,211,211,0.4) 
                    center left
                    no-repeat
                    `,   
                    confirmButtonColor: '#9FEDDA',
                    confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Okay</div>'
                })
                .then(() => {
                    locationInfo.dangerDiscription = text;
                    console.log(locationInfo);
                    returnData(locationInfo)
                    .then((result) => {
                        if(result === 404) userUnLoginAlarm();
                        else $(".withInput").toggleClass('toggleEffect');
                    })
                })
            }
        }
    }
    else{
        if(clickElement.hasClass('toggleEffect')){
            deleteConfigAlarm()
            .then((result) => {
                if (result.value){
                    deleteCompleteAlram()
                    .then(() => {
                        returnData(locationInfo);
                        clickElement.toggleClass('toggleEffect');
                    });
                }
            });
        }
        else{
            duplicateDataAlarm();
        }
    }    
});  

function dataRecordedAlarm() {
    return swal({
            title: 'Thank you!',
            // title: arrLang[lang]['thxMsgTitle'],
            text: 'Your input has been recorded.',
            // text: arrLang[lang]['thxMsgContent'],
            imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png', 
            imageAlt: 'Cat logo',
            animation: false,
            customClass: 'swal2-thx-msg',
            backdrop: `
                rgba(211,211,211,0.4) 
                center left
                no-repeat
            `,
            confirmButtonColor: '#9FEDDA',
            confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>'
        })
};

function userUnLoginAlarm(){
    return swal({
            title: 'Wait!',
            // title: arrLang[lang]['thxMsgTitle'],
            text: 'You should login.',
            // text: arrLang[lang]['thxMsgContent'],
            imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png', 
            imageAlt: 'Cat logo',
            animation: false,
            customClass: 'swal2-thx-msg',
            backdrop: `
                rgba(211,211,211,0.4) 
                center left
                no-repeat
            `,
            confirmButtonColor: '#9FEDDA',
            confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>'
    })
}

function deleteConfigAlarm(){
    return swal({
        title: 'Are you sure?',
        // title: arrLang[lang]['cancelMsgTitle'],
        imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png',
        imageAlt: 'Cat logo',
        animation: false,
        customClass: 'swal2-cancel-msg',
        backdrop: `
            rgba(211,211,211,0.4) 
            center left
            no-repeat
        `,
        // Crime-ridden areas : #F3C78D & Safe areas : #9FEDDA
        showCancelButton: true,
        confirmButtonColor: '#9FEDDA',
        confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>',
        cancelButtonColor: '#F3C78D',
        cancelButtonText: '<div id="swal2-cancelBtnTxt" style="color:#000000">Cancel</div>',
    });
}


function deleteCompleteAlram() {
    return swal({
        title: 'Deleted!',
        // title: arrLang[lang]['cancelConfirmMsgTitle'],
        text: 'Your input has been deleted.',
        // text: arrLang[lang]['cancelConfirmMsgText'],
        type: 'success',
        animation: true,
        customClass: 'swal2-cancel-confirm-msg',
        // backdrop color : light gray
        backdrop: `
            rgba(211,211,211,0.4) 
            center left
            no-repeat
        `,
        confirmButtonColor: '#9FEDDA',
        confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>'
    })
}

function duplicateDataAlarm(){
    return swal({
        title: 'Wait!',
        // title: arrLang[lang]['thxMsgTitle'],
        text: 'Your input has already been recorded.',
        // text: arrLang[lang]['thxMsgContent'],
        imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png', 
        imageAlt: 'Cat logo',
        animation: false,
        customClass: 'swal2-thx-msg',
        backdrop: `
            rgba(211,211,211,0.4) 
            center left
            no-repeat
        `,
        confirmButtonColor: '#9FEDDA',
        confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>'
    })
}

function toastAlarm(){
    return swal({
        toast: true,
        position: 'center',
        type: 'error',
        title: '50자 이하로 적어주세요',
        showConfirmButton: true,
        timer : 3000
    });
}

function returnData(locationInfo){
   return new Promise((resolve, reject) => {
        // 클릭 이벤트안에서 사용자가 선택한  정보를 서버로 연결하는 라우터
        $.post('/dangerSpot', locationInfo ,(data) => {
            if(data.result === 1) {
                createUserMaker(locationInfo.locationId, locationInfo.options); // userspotsetting.js
                alert(data.comment);  
                resolve(data.result);
            }
            else if(!data.result) {
                // 우선적으로 방금전에 생성한 마커만 지우는 것만 확인
                removeMarkerTool(locationInfo.locationId);
                alert(data.comment);  
                resolve(data.result);
            }
            else {
                alert(data.comment);
                resolve(data.result);

            }
        });
    })
}

// title의 첫번째로 정해진 locationId값을 배열에서 탐색하여 map에 존재하는 주황 마커들을 제거해준다.
// 찾으면 loop를 바로 나가고 싶은데, 왜 findIndex는 안먹지?
// forEach를 사용한다면, 선택된 요소를 삭제하는 법은??????
function removeMarkerTool(locationId){
    // var index = userSelectMarker.findIndex((el) => {
    //         return el.title.spilt('@')[0] === locationId;
    // });
    
    // userSelectMarker[index].setMap(null);
    // userSelectMarker.splice(index, 1);
    userSelectMarker.forEach((el) => {
        if(el.title.split('@')[0] === locationId){
            el.setMap(null);
        }
    })
}