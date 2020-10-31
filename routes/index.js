var express = require('express');
var router = express.Router();
var model = require('../model')
var moment =  require('moment');
const { format } = require('morgan');

/* GET home page. */
router.get('/', function(req, res, next) {
  //
  var username  = req.session.username || ''
  var page = req.query.page || 1   //接受前端传回的页码

  // 分页   定义数据格式
  var data=
  {
    total:0,   //总共页数
    curPage: page,   //
    list: []  // 当前页的文章列表
  }
  var pageSize = 2 //每页页数定义

  model.connect(function(db){
    //1   查询*文章 
                                                                                     // db.collection('users').find().toArray(function(err,docs){
                                                                                             // console.log('用户列表',docs)
     db.collection('articles').find().toArray(function(err,docs){
      console.log('文章列表',docs)
      data.total = Math.ceil(docs.length / pageSize) //向上取整

 // 2 查询当前页的文章列表 
      model.connect(function(db){
       // sort()  limit()  skip()      这里查询mongodb官方文档操作
       //报错  find没加    括号                                        
db.collection('articles').find().sort({_id:-1}).limit(pageSize).skip((page
          -1)*pageSize).toArray(function(err, docs2){  
            //bug修改  删除文章页面跳转
            if(docs2.length ==0){
              res.redirect('/?page='+((page-1) || 1))
            }else{

            }
                     docs.map(function(ele,index){
        // 时间戳
        ele['time'] = moment(ele.id).format('YYY-MM-DD HH:mm:ss')
      })
 
              data.list=docs2
              res.render('index',{username:username,data:data});
             })
        })
 // data.list = docs
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




//渲染发布文章页     /编辑文章页
router.get('/write',function(req, res, next) {
    var username  = req.session.username || ''
    var id = parseInt(req.query.id)
    var page = req.query.page
    var item = {
      title: '',
      content: ''
    }

      if(id){   //这里是编辑
        model.connect(function(db){
          db.collection('articles').findOne({id:id},function(err,docs){
            if(err){
              console.log('查询失败')
            }else{
              item= docs
              item['page']=page
              res.render('write', {username: username, item: item})
            }
          })
        })
      }
      
      
      
      else{   //这里是新增
            //报错2
  res.render('write',{username:username});
      }



})





module.exports = router;
