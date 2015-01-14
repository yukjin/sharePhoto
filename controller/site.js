/**
 * Created by luzhen on 15-1-13.
 */
var photo=require('../lib/photo');
var eventProxy=require('eventproxy');
var conf=require('../conf/conf');
var qn=require('qn');
var client = qn.create({
    accessKey: conf.AccessKey,
    secretKey: conf.SecretKey,
    bucket: conf.bucket,
    domain: conf.domain
});
exports.index = function (req,res,next) {

    var ep=new eventProxy();
    ep.all('getPhotos',function (photos) {
        res.render('index',{'photos':photos,'nextPage':2});
    });
    photo.getPhotos(1, function (err,photos) {
        if(err){
            next(err);
        }
        ep.emit('getPhotos',photos);
    });

};

exports.indexPagination = function (req,res,next) {
    var pageNum=parseInt(req.params.pageNum) || 1;
    var nextPage=pageNum+1;
    photo.getPhotos(pageNum, function (err,photos) {
        if(err){
            next(err);
        }
        res.send(photos);
    });
};

exports.showUploadPhoto= function (req,res,next) {
    res.render('uploadPhoto');
};

exports.uploadPhoto= function (req,res,next) {
    var user=req.session.user||'';
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype){
        client.upload(file, {filename: filename},function(err,result){
            if(err){
                next(err);
            }else{
                var qnUrl=result.url;
                res.send(qnUrl);
            }
        });
    });
    req.pipe(req.busboy);
};

exports.addPhoto= function (req,res,next) {
    var user=req.session.user||'';
    var url=req.body.url||'';
    var description=req.body.description||'';
    if ([url,description].some(function (item) { return item === '';})){
        res.send({'error':'缺少图片或描述！'});
        return;
    }
    photo.addPhoto({'url':url,'description':description,'user_id':user.id},function (err,result) {
        if(err){
            next(err);
        }else{
            res.send({'success':true});
        }
    });
}
