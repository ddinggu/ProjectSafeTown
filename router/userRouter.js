module.exports = function(app, User) {

    // 회원가입(실패할 시 스키마에서 설정한 validation 값을 반환하도록 함)
    app.post('/signup', function(req, res) {
        let body = req.body;
        let validator = {email_address : body.email_address};
        let newUser = new User(body); 

        User.findOne(validator, function(err, member){
            if(err) res.send(err);
            if(member) res.send('이미 동일한 이메일이 존재합니다.');
            else{
                newUser.save(function(err) {
                    if(err) {
                        let property = Object.keys(err.errors)[0];
                        res.send(err.errors[property]['message']);
                    } 
                    res.send('확인 완료! DB 확인해보세요.');
                })
            }
        })
    })

    // 로그인 (스키마에서 지정한 Schema.method.checkPassword 주의!!)
    // 회원이 입력한 비밀번호를 다시 해시시켜 DB에 들어있는 해시값과 비교 (단방향 해쉬 함수의 특징)
    app.post('/accessLogin', function(req, res) {
        let body = req.body;
        let validator = {email_address : body.email_address};
        let inputPassword = body.password;
            
        User.findOne(validator, function(err, member) {
            if(err) res.send(err);
            if(!member) res.send('아이디가 틀렸습니다.')
            else{
                member.checkPassword(inputPassword, function(err, isMatch) {
                    if(err) res.send(err);
                    if(isMatch) res.send('로그인 되었습니다.');
                    else res.send('비밀번호가 틀렸습니다.')
                })
            }
        })
    })

    // 회원탈퇴 ( 로그인 부분과 동일하게 비밀번호 검색후 삭제 진행 )
    app.post('/deleteUser', function(req, res) {
        let body = req.body;
        let validator = {email_address : body.email_address};
        let inputPassword = body.password;
            
        User.findOne(validator, function(err, member) {
            if(err) res.send(err);
            if(!member) res.send('아이디가 틀렸음!')
            else{
                member.checkPassword(inputPassword, function(err, isMatch) {
                    if(err) res.send(err);
                    if(!isMatch) res.send('비밀번호가 틀렸습니다.');
                    else{
                            // 모델에서 찾은 아이디를 삭제
                        member.remove();
                        res.send('삭제됬으니 DB확인하세요.');
                    }
                }
            )}
        })
    })

}// 
