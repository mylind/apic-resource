var express = require('express');
var router = express.Router();
var map = require('./dataCache');
var ldap = require('../utils/ldap.js');


router.post('/map/put', map.postkey);


router.post('/map/get', map.getkey);


router.post('/map/del', map.delkey);


router.post('/map/clear', map.clearmap);


router.post('/map/upload', map.uploadfile);

router.post('/user/search', function(req, res){
	var query = req.body.queryInput;
	console.log(query);
	ldap.getUsersInfo(query, function(result){
		console.log("length:" + result.length);
		res.json(result);
	});
	
});

router.post('/user/get', function(req, res){
	var query = req.body.queryInput;
	ldap.getUsersInfo(query, function(result){
		res.json(result);
	});
});

// router.get('/getUser',function(req, res){
// 	ldap.getUsersInfo('abc', function(result){
// 		res.render('response');
// 	});
// });


module.exports = router;