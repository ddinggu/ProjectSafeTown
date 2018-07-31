module.exports = function(app,MongoClient){
  var url = 'mongodb+srv://meow_admin:zxcvbnm070809@ddinggu-m001-dgyfk.mongodb.net/cctv';

  //default 화면
  app.get('/',function(req,res){
    res.render('index', {title:"My homepage", length:5});
  });

  //db에서 값 불러오기 예시
  app.get('/cctv',function(req,res){
    MongoClient.connect(url,function(err,client){
      var db = client.db('cctv');
      var cursor = db.collection('geoSeoulcctv').find({
        'properties.location':'성동구 '//동대문구,강동구,광진구,송파구
      }).project({
        '_id':0,
        'geometry':1,//위도경도
        //'properties':0//주소
      });
      cursor.toArray(function(err,item){//typeof item = "array"
        if(err){
          console.log(err);
        }else{
          res.send(item);
          client.close();
        }
      });
    });
  });

  // Import cctv data router
  app.get('/testimportcctv', (req, res) => {
    MongoClient.connect(url, (err, client) => {
      var db = client.db("cctv");
      var cursor = db.collection('geoSeoulcctv').find({});
      cursor.toArray((err, item) => {
        if(err) console.log(err);
        else {
          res.send(item);
          client.close();
        }
      });
    });
  });
}
