var express = require('express');
var router = express.Router();
var model = require('../model');
/* GET users listing. */

// 新增、编辑
router.post('/add', function(req, res, next) {
      var id = parseInt(req.body.id)
      if(id){       //修改
  
      }else{
                //发布
      }
var data = {
    title: req.body.title,
     content:req.body.content,
     id:Date.now(),
     username:req.session.username
}
model.connect(function(db) {
    db.collection('articles').insertOne(data, function(err, ret) {
      if(err) {
        console.log('文件发布失败', err)
        res.redirect('/write')
      } else {
        res.redirect('/')
        }
     })
    })
})


//删除文章接口
router.get('/delete', function(req, res, next) {
  var id = parseInt(req.query.id)
  var page = req.query.page
  model.connect(function(db) {
    //api  deleteOne
    db.collection('articles').deleteOne({id: id}, function(err, ret) {
      if (err) {
        console.log('删除失败')
      } else {
        console.log('删除成功')
      }
      res.redirect('/?page='+page)
})
})
})
module.exports = router;
