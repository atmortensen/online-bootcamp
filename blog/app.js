var express = require('express'),
    app = express(),
    mongoose = require('mongoose'), 
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sanitize = require('express-sanitizer');

mongoose.connect('mongodb://localhost/blog');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);


// INDEX
app.get('/', function(req, res){
	res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});

// NEW
app.get('/blogs/new', function(req, res){
	res.render('new');
});

// CREATE
app.post('/blogs', function(req, res){
	req.body.blog.body = req.sanitize();
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	});
});

// SHOW
app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			console.log(err);
		} else {
			res.render('show', {blog: blog});
		}
	});
});

// EDIT
app.get('/blogs/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			console.log(err);
		} else {
			res.render('edit', {blog: blog});
		}
	});
});

// UPDATE
app.put('/blogs/:id', function(req, res){
	req.body.blog.body = req.sanitize();
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

// DESTROY 
app.delete('/blogs/:id', function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(3000, function(){
	console.log('Server Running');
});