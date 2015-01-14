/**
 * Created by luzhen on 15-1-13.
 */
var express=require('express');
var router = express.Router();
var site=require('./controller/site');
var sign=require('./controller/sign');
var filter=require('./controller/filter');

router.get('/login',filter.checkNotLogin);
router.post('/login',filter.checkNotLogin);
router.get('/logout', filter.checkLogin);
router.get('/register', filter.checkNotLogin);
router.post('/register', filter.checkNotLogin);
router.get('/uploadPhoto',filter.checkLogin);
router.post('/uploadPhoto',filter.checkLogin);
router.post('/addPhoto',filter.checkLogin);

router.get('/login',sign.showLogin);
router.post('/login',sign.login);

router.get('/logout',sign.logout);

router.get('/register',sign.showRegister);
router.post('/register',sign.register);

router.get('/new',site.index);
router.get('/',site.index);
router.get('/new/:pageNum',site.indexPagination);


router.get('/uploadPhoto',site.showUploadPhoto);
router.post('/uploadPhoto',site.uploadPhoto);
router.post('/addPhoto',site.addPhoto);
module.exports=router;
