/*
Comalbum - a cooperative shopping list
by Kenneth Dammyr, 2014

app.js
*/

var express = require("express");
var db = require("./db.js");

var app = express();

// simple logger
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});
app.use(express.json()); 

app.get('/api/shop/list', function(req, res) {
	db.shoplist(function(shopitems){
		res.json(shopitems);
		console.log("Got back: ", shopitems);
	});
});

app.post('/api/shop/', function(req, res) {
	db.shopadd(req.body, function(response){
		console.log("We added: ", response);
		res.json(response);
	});
});

app.delete('/api/shop/:id', function(req, res) {
	db.shopdelete(req.params.id, function(response){
		console.log("We deleted: ", response);
		res.send("We deleted: ", response);
	});;
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});
