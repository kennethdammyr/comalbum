/*
Comalbum - a cooperative shopping list
by Kenneth Dammyr, 2014

db.js
*/

var MongoClient	= require("mongodb"),
	format	= require('util').format; 
	connectionString = "mongodb://api:apihost@ds027338.mongolab.com:27338/comalbum";
var BSON = MongoClient.BSONPure;

var shopadd = function(shopitems, done){
	console.log("Vi skal legge til: ", shopitems);
	
	MongoClient.connect(connectionString, function(err, db) { // Connect to dB
		if(err) throw err;
		
		collection = db.collection('shopitems').insert(shopitems, function(err, object){
			done(object);
		});
		
	});

};

var shopdelete = function(id, done){
	console.log("Vi skal slette: ", id);
	
	MongoClient.connect(connectionString, function(err, db) { // Connect to dB
		if(err) throw err;
		
		var o_id = new BSON.ObjectID(id); // Can't use ID as is
		
		db.collection('shopitems').findAndModify(
		{'_id': o_id}, // query
		[['_id','asc']],  // sort order
		{$set: {'shopped': 'true'}}, // replacement
		{}, // options
		function(err, object) {
			if (err){
				console.warn(err.message);  // returns error if no matching object found
			}else{
				done(object);
			}
		});
	});
	
};

var shoplist = function(done){
	console.log("List alle shopitems");

	MongoClient.connect(connectionString, function(err, db) { // Connect to dB
	if(err) throw err;
	
		var collection = db.collection('shopitems').find({}); // Search dB
		
		collection.toArray(function(err, doc){
			done(doc);	
		});
		
		
  	});

};

exports.shopadd		= shopadd;
exports.shopdelete	= shopdelete;
exports.shoplist	= shoplist;