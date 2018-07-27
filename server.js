//default setting
let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
//let session = require('express-session');

let server = app.listen(3000,function(){
  console.log("server started on port 3000!");
})

app.set('views',__dirname+'/view');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//kibaek. routing enviroment for client main events
let mainRouter = require('./router/mainRouter')(app,fs);

//gyungjin. routing enviroment for db associated events
let User = require('./DBmodel/userSchema');
let userRouther = require('./router/userRouter')(app, User);
