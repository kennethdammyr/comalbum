/*
Comalbum - a cooperative shopping list
by Kenneth Dammyr, 2014

app.js
*/

var express = require("express");
var db = require("./db.js");
var cors = require("cors");

var app = express();

// simple logger
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});
app.use(express.json());
app.use(cors());



app.get('/api/shop/list', function(req, res) {
	db.shoplist(function(shopitems){
		res.json(shopitems);
		console.log("We have: ", shopitems);
	});
});

app.post('/api/shop/', function(req, res) {
	console.log("Hva vi har: ", req.body);
	db.shopadd(req.body, function(response){
		console.log("We added: ", response);
		res.json(response);
	});
});

app.delete('/api/shop/:id', function(req, res) {
	db.shopdelete(req.params.id, function(response){
		console.log("We deleted: ", response);
		res.json(response);
	});;
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});
