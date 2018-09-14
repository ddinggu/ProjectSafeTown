// 언어 설정을 위한 데이터 변수 설정 
var arrLang = {
    "en-us": {
        "tabTitle": "SaferTrip",
        "mainPgTitle": "SaferTrip",
        "subTitle": "Find safer paths to travel",
        "story" : "Kitty always patrols tourist attractions to help peopl to travel safely So, Kitty asks for your help Please let Kitty kno crime-ridden areas Based on what people tell Kitty, Kitty will guide yo to safer paths to travel.",
        "firstOption" : "Lonesome road",
        "secondOption" : "Too Dark",
        "thirdOption" : "There was an incident",
        "fourthOption" : "Red-light district",
        "fifthOption" : "Etc",
        "thxMsgTitle" : "Thank you!",
        "thxMsgContent" : "Your input has been recorded.",
        // "thxMsgConfirmBtnTxt" : "Got it!",
        "textboxMsgTitle" : "Why do you feel unsafe here?",
        "textboxMsgInputPlaceholder" : "Type your message :)",
        "textboxMsgInputValidator" : "You need to write something!",
        "textboxMsgValidationMsg" : "You entered",
        "cancelMsgTitle" : 'Are you sure?',
        "cancelConfirmMsgTitle" : 'Recorded!',
        "cancelConfirmMsgText" : 'Your input has been deleted.',
    },
    "ko": {
        "tabTitle": "야옹씨의 안전한 하루",
        "mainPgTitle": "야옹씨의 안전한 하루",
        "subTitle": "내가 만들어나가는 우리동네 안전 지도",
        "story" : "야옹씨는 사람들이 안전하 여행할 수 있도록 항상 여행지를 순찰하는 좋은 길고양이에요. 그래서 야옹씨 여러분들에게 도움을 청해요. 위험해보이는 길 알고있다면 알려주세요! 여러분이 알려주신 정보를 기반으로 위험 지역을 피해 안전한 길로 안내해 드릴 거에요.",
        "firstOption" : "인적이 드물어요",
        "secondOption" : "어두워요",
        "thirdOption" : "사고가 난 적 있어요",
        "fourthOption" : "유흥가에요",
        "fifthOption" : "기타",
        "thxMsgTitle" : "감사합니다!",
        "thxMsgContent" : "의견이 입력되었습니다.",
        // "thxMsgConfirmBtnTxt" : "알겠어요!",
        "textboxMsgTitle" : "왜 이곳이 위험하다고 생각하시나요?",
        "textboxMsgInputPlaceholder" : "의견을 작성해주세요 :)",
        "textboxMsgInputValidator" : "아무것도 적지 않으셨어요!",
        "textboxMsgValidationMsg" : "입력하신 의견이에요",
        "cancelMsgTitle" : '삭제하실건가요?',
        "cancelConfirmMsgTitle" : '기록되었습니다!',
        "cancelConfirmMsgText" : '의견이 삭제되었습니다.'
    }
};

// https://codepen.io/hlim18/pen/jppoGK
// The default language is Korean
var lang = "ko";
// Check for localStorage support (On reload, show the website based on previous setting)
if("localStorage" in window){
    var usrLang = localStorage.getItem("uiLang");
        if(usrLang) {
            lang = usrLang
        }
}

$(document).ready(function() {
    $(".lang").each(function(index, element) {
        $(this).text(arrLang[lang][$(this).attr("key")]);  // 이미 저장된 요소들의 key값에 대칭 되는 object의 value들을 가져온다. 
    });
      
    // // get/set the selected language
    // // what happens after clicking the "English" or "한국어" button
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
                  element.text(arrLang[lang][$(this).attr("key")]); 
                });
    // // * language setting END
            }
            // // "click" END
        });
        // "on" END

    // loading animation
    $("#fallingStars").delay(300).animate({'opacity':'1'},500);
    $("#title").delay(500).animate({'opacity':'1'},800);
    $("#slogan").delay(800).animate({'opacity':'1'},800);

// multi-language inside of swal not working : https://jsfiddle.net/hlim188/15no3zyd/68/

})
