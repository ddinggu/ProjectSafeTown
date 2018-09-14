module.exports = function(app, User, config){
    const MongoClient = require('mongodb').MongoClient;
    const url = config.mongoUrl;
    const tutorialRoute = config.tutorialUrl;

    //default 화면
    app.get('/',function(req,res){
        res.render('load', {title:"My homepage", length:5});
    });  

    app.get('/main',function(req,res){
        res.render('index', {title:"My homepage", naverToken : config.naverToken});
    });  

    // Import tutorial data router
    app.get('/tutorialdata', function(req, res) {
        MongoClient.connect(tutorialRoute, function(err, client) {
                if(err) console.log(err);
                var db = client.db("tutorial");
                var cursor = db.collection('users')
                            .find({"email_address" : "tutorial@naver.com"})
                            .project({ "_id" : 0, "dangerLocation.geometry.coordinates" : 1});
                cursor.toArray( function(err, item) {
                    if(err) console.log(err);
                    else {
                        res.send(item);
                        client.close();
                    }
                })
            });
    });

    // // Import cctv data router
    // app.get('/testimportcctv', function(req, res) {
    //     MongoClient.connect(url, function(err, client) {
    //         if(err) console.log(err);
    //         var db = client.db("cctv");
    //         var cursor = db.collection('geoSeoulcctv').find({});
    //         cursor.toArray( function(err, item) {
    //             if(err) console.log(err);
    //             else {
    //                 res.send(item);
    //                 client.close();
    //             }
    //         })
    //     });
    // });


    // Import cctv data around user sphere 
    app.get('/storedaroundcctv', (req, res) =>{
        let coords = [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        console.log(coords);
        
        MongoClient.connect(url, (err, client) => {
            if(err) console.log(err);
            const db = client.db('cctv');
            
            loadStoredCCTVdata(db, coords, (result) => {
                res.send(result);
                client.close();
            });
            
        })
    })
    
    // Import logined cctv data router
    app.get('/userimportcctv', function(req, res) {
        console.log(req.session.email);
        if(!req.session.email) res.send(null);
        
        else MongoClient.connect(url, function(err, client) {
                if(err) console.log(err);
                var db = client.db("cctv");
                var cursor = db.collection('users')
                               .find({"email_address" : req.session.email})
                               .project({ "_id" : 0, "dangerLocation.geometry.coordinates" : 1, 
                                          "dangerLocation.id" : 1, "dangerLocation.options" : 1});
                cursor.toArray( function(err, item) {
                    if(err) console.log(err);
                    else {
                        res.send(item);
                        client.close();
                    }
                })
            });
    });

    // 버튼 클릭시 회원 DB로 선택 데이터 전송
    // 정확한 사용 용도를 구분하기 위해 delete api를 사용하고자 했으나, jquery에서 지원하지 않으며 
    // delete를 이용한다 하더라도 body에 들어가는 것이 아닌, header에 들어가기 때문에 url 노출 및 기능적으로 불안한 면이 있다고 한다.
    // 따라서, post안에서 조건에 따라 실행되도록 사용하고자 한다. 
    app.post('/dangerSpot', function(req, res){
        let query = {email_address : req.session.email};
        let dangerDiscription;

        if(!req.body.dangerDiscription) dangerDiscription = 'none';
        else dangerDiscription = req.body.dangerDiscription;
        
        let calledData = {locationId : req.body.locationId,
                          geolocation : req.body.geolocation,
                          dangerInfo : req.body.dangerData,
                          flag : parseInt(req.body.flag),
                          dangerDiscription : dangerDiscription,
                          options : req.body.options
                         };
        console.log(calledData.locationId);
        console.log(`선택한 옵션 : ${calledData.options}`);
        
        User.findOne(query, function(err, member){
            if(err) res.send(err);
            if(!member) res.send({comment : '쿼리에러(세션에 회원정보가 없거나, DB에 맞는 회원정보가 없음)', 
                                  result : 404 });
            else if(!calledData.flag){
                member.addDangerLocationInfo(calledData);
                res.send({comment : 'DB등록 확인 필요', 
                            result : 1 });
            } 
            // if(member.findOverlapLocationId(calledData.locationId, calledData.dangerInfo)){
            //     res.send({comment : 'DB데이터 중복', 
            //                 result : 2 });
            // }
            else{
                member.removeDangerLocationInfo(calledData);
                res.send({comment : 'DB정보 삭제! 확인 필요', 
                            result : 0 });
            }

        });
    });


    // 튜토리얼용 데이터 불러오는 라우터 
    app.get('/tutorialdata', function(req, res) {
        MongoClient.connect(url, function(err, client) {
                if(err) console.log(err);
                var db = client.db("cctv");
                var cursor = db.collection('users')
                            .find({"email_address" : "tutorial@naver.com"})
                            .project({ "_id" : 0, "dangerLocation.geometry.coordinates" : 1});
                cursor.toArray( function(err, item) {
                    if(err) console.log(err);
                    else {
                        res.send(item);
                        client.close();
                    }
                })
            });
    });

}// end point



function loadStoredCCTVdata(db, coords, cb){
    const collection = db.collection('geoSeoulcctv');
    let result = {};

    collection.find(
        { 'geometry':
          { $near :
            { $geometry:
              { type: "Point",  coordinates: coords },
                $maxDistance: 150
            }
          }
        }
      )
    .toArray( (err, docs) => {
        if(err) {
            console.dir(err);
            
            result.result = 0;
            result.comment = err;
            result.item = [];
        }
        else if(!docs.length || docs.length === 1){
            console.log('정보X');
            
            result.result = 2
            result.comment = "근처에 위치한 정보가 없습니다."
            result.item = [];  
        }
        else {
            console.log('정상출력');
            
            result.result = 1
            result.comment = `근처에 위치한 정보가 ${docs.length}개 입니다.`
            result.item = docs;  
        }

        cb(result);
    })

}

