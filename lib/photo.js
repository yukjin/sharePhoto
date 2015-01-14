/**
 * Created by luzhen on 15-1-13.
 */
var pool=require('./db');
var conf=require('../conf/conf');
var tools=require('../lib/tools');
exports.getPhotos= function (pageNum,callback) {
    pool.query("select p.id,url,description,user_id,user_name,create_time from photos p,user u where u.id=p.user_id  order by create_time desc limit ?,?",[(pageNum-1)*conf.pageSize,conf.pageSize],function (err,rows) {
        if(err){
            callback(err);
        }else{
            rows.forEach(function (row) {
                row.create_time=tools.formatDate(row.create_time,true);
            });
            callback(null,rows);
        }
    });
};

exports.addPhoto= function (option,callback) {
    pool.query('insert into photos values(null,?,?,?,now())',[option.url,option.description,option.user_id],function (err,rows) {
        if(err){
            callback(err);
        }else{
            callback(null,rows);
        }
    });
};
