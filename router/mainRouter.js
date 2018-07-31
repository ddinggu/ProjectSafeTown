const MongoClient = require('mongodb').MongoClient;
const url = 'mongo Atlas server url';


module.exports = function(app,fs){
  //default 화면
  app.get('/',function(req,res){
    res.render('index', {title:"My homepage", length:5});
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
            })
        });
    });

  
}
