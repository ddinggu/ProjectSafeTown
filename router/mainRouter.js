module.exports = function(app, User, config){
    const MongoClient = require('mongodb').MongoClient;
    const url = config.mongoUrl;

    //default 화면
    app.get('/',function(req,res){
        res.render('load', {title:"My homepage", length:5});
    });  

    app.get('/main',function(req,res){
        res.render('index', {title:"My homepage", naverToken : config.naverToken});
    });  

    // Import cctv data router
    app.get('/testimportcctv', function(req, res) {
            MongoClient.connect(url, function(err, client) {
                if(err) console.log(err);
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
        req.session.email ? res.send(req.session.email) : res.send(null);
    });


}// end point
