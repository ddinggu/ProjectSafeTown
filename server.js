//default setting
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

let server = app.listen(3000,function(){
  console.log("server started on port 3000!");
})

mongoose.connect('');

app.set('views',__dirname+'/view');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
    secret : "udvxm9xc!!>?.x122''[]sd232",
    resave : false,
    saveUninitialized : true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 // 1시간후 DB세션 소멸
    }),
    cookie : {
        maxAge : 1000 * 60 * 60 // 1시간후 쿠키 세션 소멸
    }
}));

//gyungjin. routing enviroment for db associated events
let User = require('./DBmodel/userSchema');
let userRouther = require('./router/userRouter')(app, User);

//kibaek. routing enviroment for client main events
let mainRouter = require('./router/mainRouter')(app,MongoClient);
