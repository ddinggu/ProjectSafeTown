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
        "tutorial1" : "Areas that CCTV cover are marked with green circles.",
        "tutorial2-1" : "Crime-ridden areas are marked with orange circles.",
        "tutorial2-2" : "You can participate in reporting crime-ridden areas.",
        "tutorial3" : "Please tap where you feel unsafe.",
        "tutorial4-1" : "Orange location icon is appeared.",
        "tutorial4-2" : "Tap the icon!",
        "tutorial5-1" : "Find a safer path",
        "tutorial5-2" : "You can find a safer path more likely to be covered by CCTVs and/or less likely to be reported as crime-ridden areas.",
        "menu1" : "Introduction",
        "menu2" : "How to Use",
        "menu3" : "Ratings & Reviews"
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
        "cancelConfirmMsgText" : '의견이 삭제되었습니다.',
        "tutorial1" : "CCTV가 설치되어있는 곳 초록색으로 표시되어있어요.",
        "tutorial2-1" : "위험하게 느껴지는 곳 주황색으로 표시되어있어요.",
        "tutorial2-2" : "여러분이 직접 표시 할 수 있어요.",
        "tutorial3" : "길을 가다 위험해보이는 곳이 있다 눌러주세요.",
        "tutorial4-1" : "주황색 위치 아이콘이 생겼어요.",
        "tutorial4-2" : "아이콘을 눌러보세요!",
        "tutorial5-1" : "안전길찾기",
        "tutorial5-2" : "CCTV가 설치되어 있거나 위험하게 느껴지는 곳을 최대한 피한 안전한 길로 안내 받을 수 있어요.",
        "menu1" : "소개",
        "menu2" : "사용방법",
        "menu3" : "사용후기"
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

    // // * language setting START
    $(".lang").each(function(index, element) {
        $(this).text(arrLang[lang][$(this).attr("key")]);
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
                  $(this).text(arrLang[lang][$(this).attr("key")]);
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

// toggle background color : http://jsfiddle.net/davidThomas/mX35z/1/ 

    // https://codepen.io/hlim18/pen/EpbLmN
    $('#test').click(function(){
        // $(".withoutInput:hidden").fadeIn()

        // $(".withoutInput").fadeToggle()
        //     // // *** only for "thank-you" button
        //     .on("click", function(){
        //         // hex color #_ _ _ _ _ _
        //         $(this).css("background", "#F3C78D");
        //     })

        //     .on({
        //         // // include this for "thank-you" & "cancel" message codes
        //         click: function(){
        //         // // "Thank-you" message START
        //             swal({
        //                 // title: 'Thank you!',
        //                 // title: '<h2 class="lang" key="thxMsgTitle"></h2>',
        //                 title: arrLang[lang]['thxMsgTitle'],

        //                 // text: 'Your input has been recorded.',
        //                 // text: '<div style="color:#4B0082">Your input has been recorded.</div>',
        //                 // text: '<div class="lang" key="thxMsgContent"></div>',
        //                 text: arrLang[lang]['thxMsgContent'],

        //                 // type: 'warning',
        //                 imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png', 
        //                 imageAlt: 'Cat logo',
        //                 // imageClass: 'swal2-thx-img',
        //                 animation: false,
        //                 customClass: 'swal2-thx-msg',
        //                 // backdrop color : light gray
        //                 backdrop: `
        //                     rgba(211,211,211,0.4) 
        //                     center left
        //                     no-repeat
        //                 `,
        //                 confirmButtonColor: '#9FEDDA',
        //                 confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>'
        //                 // confirmButtonText: '<div class="lang" key="thxMsgConfirmBtnTxt" id="swal2-confirmBtnTxt" style="color:#FFFFFF"></div>'

        //                 // // can't assign id in the button...
        //                 // confirmButtonText: arrLang[lang]['thxMsgConfirmBtnTxt']
        //             });
        //             // swal END
        //         }
        //         // // "click: function" END
        //     });
        //     // // "Thank-you" message END


        // // // CANCEL button START
        // // "cancel message START for "option1"
        $("#option1").fadeToggle()
            .on({
                // // include this for "thank-you" & "cancel" message codes
                click: function(){

                    // "Cancel" button START
                    swal({
                        // title: 'Are you sure?',
                        title: arrLang[lang]['cancelMsgTitle'],
                        imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png',
                        imageAlt: 'Cat logo',
                        animation: false,
                        customClass: 'swal2-cancel-msg',
                        // backdrop color : light gray
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
                    }).then((result) => {
                        if (result.value){
                            swal({
                                // title: 'Recorded!',
                                title: arrLang[lang]['cancelConfirmMsgTitle'],
                                // text: 'Your input has been deleted.',
                                text: arrLang[lang]['cancelConfirmMsgText'],
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
                            }).then(function(){
                                // hex color #_ _ _ _ _ _
                                $("#option1").css("background", "#F3C78D");
                            });
                        }
                    });
                    // "cancel" button END
                }
                // // "click: function" END
            });
            // // "cancel message END for "option1"

            // // "cancel message START for "option2"
            $("#option2").fadeToggle()
            .on({
                // // include this for "thank-you" & "cancel" message codes
                click: function(){

                    // "Cancel" button START
                    swal({
                        // title: 'Are you sure?',
                        title: arrLang[lang]['cancelMsgTitle'],
                        imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png',
                        imageAlt: 'Cat logo',
                        animation: false,
                        customClass: 'swal2-cancel-msg',
                        // backdrop color : light gray
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
                    }).then((result) => {
                        if (result.value){
                            swal({
                                // title: 'Recorded!',
                                title: arrLang[lang]['cancelConfirmMsgTitle'],
                                // text: 'Your input has been deleted.',
                                text: arrLang[lang]['cancelConfirmMsgText'],
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
                            }).then(function(){
                                // hex color #_ _ _ _ _ _
                                $("#option2").css("background", "#F3C78D");
                            });
                        }
                    });
                    // "cancel" button END
                }
                // // "click: function" END
            });
            // // "cancel message END for "option2"

            // // "cancel message START for "option3"
            $("#option3").fadeToggle()
            .on({
                // // include this for "thank-you" & "cancel" message codes
                click: function(){

                    // "Cancel" button START
                    swal({
                        // title: 'Are you sure?',
                        title: arrLang[lang]['cancelMsgTitle'],
                        imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png',
                        imageAlt: 'Cat logo',
                        animation: false,
                        customClass: 'swal2-cancel-msg',
                        // backdrop color : light gray
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
                    }).then((result) => {
                        if (result.value){
                            swal({
                                // title: 'Recorded!',
                                title: arrLang[lang]['cancelConfirmMsgTitle'],
                                // text: 'Your input has been deleted.',
                                text: arrLang[lang]['cancelConfirmMsgText'],
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
                            }).then(function(){
                                // hex color #_ _ _ _ _ _
                                $("#option3").css("background", "#F3C78D");
                            });
                        }
                    });
                    // "cancel" button END
                }
                // // "click: function" END
            });
            // // "cancel message END for "option3"

            // // "cancel message START for "option4"
            $("#option4").fadeToggle()
            .on({
                // // include this for "thank-you" & "cancel" message codes
                click: function(){

                    // "Cancel" button START
                    swal({
                        // title: 'Are you sure?',
                        title: arrLang[lang]['cancelMsgTitle'],
                        imageUrl: 'https://s25.postimg.cc/42csriokf/cat_Logo.png',
                        imageAlt: 'Cat logo',
                        animation: false,
                        customClass: 'swal2-cancel-msg',
                        // backdrop color : light gray
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
                    }).then((result) => {
                        if (result.value){
                            swal({
                                // title: 'Recorded!',
                                title: arrLang[lang]['cancelConfirmMsgTitle'],
                                // text: 'Your input has been deleted.',
                                text: arrLang[lang]['cancelConfirmMsgText'],
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
                            }).then(function(){
                                // hex color #_ _ _ _ _ _
                                $("#option4").css("background", "#F3C78D");
                            });
                        }
                    });
                    // "cancel" button END
                }
                // // "click: function" END
            });
            // // "cancel message END for "option4"
        // // //  CANCEL button END

        $(".withInput").fadeToggle()
            .on({
                // include this for "text-input" & "login & password" message codes
                click: async function(){

                    // // user-input message START
                    const {value: text} = await swal({
                        // title: 'Why do you feel unsafe here?',
                        title: arrLang[lang]['textboxMsgTitle'],
                        input: 'text',
                        // inputPlaceholder: 'Type your message :)',
                        inputPlaceholder: arrLang[lang]['textboxMsgInputPlaceholder'],
                        customClass: 'swal2-textbox-msg',
                        showCancelButton: true,
                        confirmButtonColor: '#9FEDDA',
                        confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Yes!</div>',
                        cancelButtonColor: '#F3C78D',
                        cancelButtonText: '<div id="swal2-cancelBtnTxt" style="color:#000000">Cancel</div>',
                        // backdrop color : light gray
                        backdrop: `
                        rgba(211,211,211,0.4) 
                        center left
                        no-repeat
                        `,
                        inputValidator: (value) => {
                            // return !value && 'You need to write something!'
                            return !value && arrLang[lang]['textboxMsgInputValidator']
                        }
                        // inputValidator END

                    });
                    // 1st swal END
                    if (text) {
                        swal({
                            // text: `Your entered : "${text}"`,
                            text: arrLang[lang]['textboxMsgValidationMsg'] + ` : "${text}"`,

                            // backdrop color : light gray
                            backdrop: `
                            rgba(211,211,211,0.4) 
                            center left
                            no-repeat
                            `,   
                            confirmButtonColor: '#9FEDDA',
                            confirmButtonText: '<div id="swal2-confirmBtnTxt" style="color:#000000">Okay</div>'
                        }).then(function(){
                            // hex color #_ _ _ _ _ _
                            $(".withInput").css("background", "#F3C78D");
                        });
                        // // 2nd swal END
                    };
                    // // if(text) END

                }
                // // async msg END
            });
            // // "withInput" END
    });   
    // "test" click function END

    // // redirect loading page(/) to main page(/main) via button event: Gi-baek
    $("body").click(function(){
        window.location = window.location + "main";
    });
})
// "document ready" function END
