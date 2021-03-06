//------------------ 기본 모듈 및 변수 설정-----------------------
const mongoose = require('mongoose');
const Double = require('@mongoosejs/double'); // 좌표값을 double 형식으로 받아오기 위해서 사용
// const bcrypt = require('bcrypt'); // 비밀번호 hash화를 위한 모듈
const Schema = mongoose.Schema;
const saltRounds = 10; // hash화 하기 위한 salt 값 지정
const config = require("../config/config.json"); // hidden Url

//----------------- mongoose를 통한 MongoDB Atlas server 접속 -----------------------
      
// mongoose가 mongo ATLAS 서버에 접근하기 위한 url       
mongoose.connect(config.mongoUrl);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('Conneted to mongoDB Atlas in cctv database');
});

//--------------------- 회원 스키마 설정 ---------------------------
const subSchema = new Schema({
    id : String,
    options : String,
    geometry : {
        type : {type : String, default : 'Point'},
        coordinates : [Double,Double]
    },
    properties : {
        locationOpinon : {type : String},
        discription : {type : String, maxlength : 50, default : 'none'},
        createDate : { type: Date, default: Date.now }
    }
},{_id : false});

const userSchema = new Schema({
    email_address : {
        type : String,
        required : [true, '아이디를 적어주세요. (DB 필터링)'],
        lowercase : true,
        index : true,
        unique : true,
        match : [/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/, '이메일 양식을 확인해주세요. (DB 필터링)']
    },
    password : {
        type : String,
        required : [true, '비밀번호를 적어주세요. (DB 필터링)'],
        match : [/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, '비밀번호는 최소 특수문자,대문자 1개와 8자리 이상이어야 합니다.(DB 필터링)']
    },
    nickname : {
        type : String,
        required : [true,'이름을 적어주세요.(DB 필터링)'],
        maxlength : [8, '닉네임은 8자리 이하로 적어주세요. (DB 필터링)']
    },
    evaluation : {
        ratings : Number,
        reviews : String
    },
    dangerLocation : [subSchema]
});

// ----------------- 지정한 스키마에 추가적인 method 설정 ----------------
// 모델에 저장되기 전에 해쉬를 적용한 비밀번호로 저장
// pre hook이 진행된후 post hook이 진행된다.

userSchema.pre('save', function(next) {
    let user = this;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) next(err);
        bcrypt.hash(user.password, salt, function(err, hashed) {
            if(err) next(err);
            else{
                user.password = hashed;
                next(); // 다음 미들웨어로 진행시킨다. (미들웨어의 실행진행순서를 파악할 수 있다.)
            }
        });
    });
});

// 비밀번호를 검사하는 메소드를 스키마에 추가
// cb : 콜백함수 --> 다음에 지정하는 콜백함수를 실행하게 된다!!!!
userSchema.methods.checkPassword = function(guess, cb){
    let user = this;

    bcrypt.compare(guess, user.password, function(err, isMatched){
        if(err) cb(err);
        cb(null, isMatched);
    })
};

userSchema.methods.findOverlapLocationId = function(locationId, userChoose){
   return this.dangerLocation.some(function(el) {
        return (el.id === locationId) && (el.properties.locationOpinon !== userChoose) ;
    });
}

// 위험지역정보를 추가 및 삭제하는 메소드를 스키마에 추가 

userSchema.methods.addDangerLocationInfo = function(info){
    this.dangerLocation.push({ 
        id : info.locationId,
        geometry : { coordinates : info.geolocation},
        properties : { locationOpinon : info.dangerInfo,
                       discription : info.dangerDiscription},
        options : info.options
    }); 
    return this.save();
}

userSchema.methods.removeDangerLocationInfo = function(info){
    this.update(
        { "$pull" : {"dangerLocation" : {"id" : info.locationId} } } ,
        function(err, raw){ 
            if(err) console.log(err);
            else console.log('success : ' + raw);
        }   
    )
}

//--------------------- 모듈화 작업 -----------------------------
module.exports = mongoose.model('User', userSchema);
