module.exports = function(app,fs){
  //default 화면
  app.get('/',function(req,res){
    res.render('index', {title:"My homepage", length:5});
  });
}
