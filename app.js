/**
 * Created by luzhen on 15-1-13.
 */
var express=require('express');
var busboy = require('connect-busboy');
var bodyParser=require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var app=express();
var router=require('./router');
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(session({
    secret: 'sharephotos', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000*30},
    resave:true,
    saveUninitialized:true
}));
app.use(busboy({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));
app.use(flash());
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;
    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(router);
app.listen(3000, function (err,result) {
    console.log('app started at 3000');

});