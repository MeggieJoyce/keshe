var express = require('express');
var router = express.Router();
var model = require('../model')
var moment =  require('moment');
const { format } = require('morgan');

/* GET home page. */
router.get('/', function(req, res, next) {
  //
  var username  = req.session.username || ''
  var page = req.query.page || 1
  // 分页
  var data={
    total:0,
    curPage: page,
    list: []  // 当前页的文章列表
  }
  var pageSize = 2

  model.connect(function(db){
    //查询*文章

    // db.collection('users').find().toArray(function(err,docs){
      // console.log('用户列表',docs)
     db.collection('articles').find().toArray(function(err,docs){
      console.log('文章列表',docs)
      var list = docs
    
      docs.map(function(ele,index){
        // 时间戳
        ele['time'] = moment(ele.id).format('YYY-MM-DD HH:mm:ss')
      })
      data.total = Math.ceil(docs.length / pageSize)
      data.list = docs
      res.render('index',{username:username,data:data});
    })
  })
});

//渲染注册页
router.get('/regist',function(req, res, next) {
  res.render('regist',{})
})

//渲染登录页
router.get('/login',function(req, res, next) {
  res.render('login',{})
})




//渲染发布文章页
router.get('/write',function(req, res, next) {
    var username  = req.session.username || ''
    //报错2
  res.render('write',{username:username});
})





module.exports = router;
