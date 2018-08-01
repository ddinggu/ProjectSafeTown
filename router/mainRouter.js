const MongoClient = require('mongodb').MongoClient;
const url = 'mongo url';


module.exports = function(app,User){
  //default 화면
  app.get('/',function(req,res){
    res.render('load', {title:"My homepage", length:5});
  });  

  app.get('/main',function(req,res){
    res.render('index', {title:"My homepage", length:5});
  });  

  // Import cctv data router
  app.get('/testimportcctv', function(req, res) {
        MongoClient.connect(url, function(err, client) {
            var db = client.db("cctv");
            var cursor = db.collection('geoSeoulcctv').find({});
            cursor.toArray((err, item) => {
                if(err) console.log(err);
                else {
                    res.send(item);
                    client.close();
                }
            })
        });
    });

    // Click orange marker
    app.get('/userLocaRegsiter', function(req, res){
        if(!req.session.email) res.send(null);
         res.send(req.session.email);
    })

  
}// end point
