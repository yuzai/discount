var express = require('express');
var sha1=require('sha1');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
/* GET users listing. */
router.post('/', function(req, res, next) {
  var data=JSON.parse(Object.keys(req.body)[0]);
  user.find({username:data.username},function(err,doc){
    if(err){
      next(err);
    }
    if(doc.length===0){
      let info = {
        login: 'fail',
        token: ''
      }
      res.send(JSON.stringify(info));
      // next('user has been exist')
    }else{
      let info = {
        login: 'success',
        token: jwt.encode(data.username)
      }
      res.send(JSON.stringify(info));
    }
  })
});
router.post(function(err,req, res, next) {
  let info = {
    register:'err',
    token:''
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.send(JSON.stringify(info));
})
module.exports = router;
