var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next){

    var uri = 'mongodb://jose:160410@ds049641.mongolab.com:49641/roparel';

    mongodb.MongoClient.connect(uri, function(err, db) {
    if (err)
        throw err;
    else
        var collection = db.collection('articles');
        collection.find({'publicado': false}).toArray(function(err, result) {
            
            res.render('home', { result: result});
        });
    });
	//res.render('main')
});

router.post('/', function(req, res, next){
    var id = req.body.article_id;
     var uri = 'mongodb://jose:160410@ds049641.mongolab.com:49641/roparel';

    mongodb.MongoClient.connect(uri, function(err, db) {
    if (err)
        throw err;
    else
        var collection = db.collection('articles');
        collection.update({_id: ObjectId(id)}, {$set: {'publicado': true}}, function(err, result){
            res.end();
        });
    });

});




module.exports = router;
