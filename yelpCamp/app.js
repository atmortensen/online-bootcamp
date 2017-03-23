var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render("index");
});

// app.get('/param/:param', function(req, res){
// 	var param = req.params.param;
// 	res.render("param", {param: param});
// });

var campgrounds = [];
app.get('/campgrounds', function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
	friends.push(req.body.newCampground);
	res.redirect("/campgrounds");
});

app.get('*', function(req, res){
	res.send("I think you might be lost...");
});

app.listen(3000, 'localhost', function(){
	console.log('Server started.');
});

