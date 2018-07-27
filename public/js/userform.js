// email양식 체크(아직 메일까지 거르는건 구현못함)
function emailCheck(email){
    let checker = /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/;

    return checker.test(email);
}

function passwordCheck(password){
    let checker = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

    return checker.test(password);
}

// 양식을 만족하지 못하면 재입력시키도록 유도
$(document).ready(function(){
    $('input[type="text"]').blur(function(){
        let userEmail = $(this).val();
        if(!userEmail) return;
        if(!emailCheck(userEmail)){
            alert('이메일양식을 확인하세요. (프론트 필터링)');
            // $(this).val('');
        }
    })

    $('input[type="password"]').blur(function(){
        let userPw = $(this).val();
        if(!userPw) return;
        if(!passwordCheck(userPw)){
            alert('비밀번호는 최소 특수문자,대문자 1개와 8자리 이상이며 숫자가 반드시 포함되야 합니다. (프론트 필터링)');
            // $(this).val('');
        }
    })
})