/*
Comalbum - a cooperative shopping list
by Kenneth Dammyr, 2014
*/

var express = require("express");
var app = express();

// simple logger
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});
app.use(express.json()); 

var shopitems = {
	1:'Brød',
	2:'Smør',
	3:'Melk',
	4:'Appelsinjuice',
	5:'Mango',
	6:'Bananer',
	7:'Pepper'
}

app.get('/api/shopitems', function(req, res) {
	res.json(shopitems);
});

app.post('/api/shopadd', function(req, res) {
	console.log("Det skjedde noe", req);
	res.send('Username: ' + req.body.shopitem);
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});
