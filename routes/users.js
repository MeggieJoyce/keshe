var express = require('express');
var router = express.Router();
//
var model = require('../model');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 
//△注册接口
router.post('/regist',function(req,res,next){
  var data = {
    username : req.body.username,
    password: req.body.password,
    password1: req.body.password1
  }
  model.connect(function(db){
    //报错1 collection拼写错误 下次注意。 
    //ret - retrun
    db.collection('users').insertOne(data,function(err,ret) {
      if(err){
        console.log("注册失败")
        //重新进入到注册的页面
        res.redirect('/regist')
      }else{
        //成功则进入登录
        res.redirect('/login')
      }
    })
  })
  //测试用
 // res.send(data)
})



//△登录接口
router.post('/login',function(req,res,next){
  var data = {
    username:req.body.username,
    password:req.body.password
  }
  //查询， 允许用户登录
model.connect(function(db){
  db.collection('users').find(data).toArray(function(err,docs){
    if(err){
      //错误，跳转，重新登录
      res.redirect('/login')
    }else{  //if查询到空数据，无用户名，跳转去注册页面
    
      if(docs.length > 0) {
        req.session.username = data.username        //进行session会话存储
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    }
  })
})
  //console.log('用户登录',data)//控制台测试用
})


//△退出登录
router.get('/logout',function(req,res,next){
  req.session.username = null
  res.redirect('/login')
})

module.exports = router;
