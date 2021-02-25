//Samson DeVol, 2/2/2021, CS290
//Setting up express
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', 3197);

//GET function, takes query stings, renders handlebar "getRecieved"
app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  console.log("get", context);
  res.render('getRecieved', context);
});

//POST function, takes query string & post data, pushs into respective arrays, renders "postRecieved"
app.post('/',function(req,res){
  var bParams = [];
  var qParams = [];
  for (var b in req.body){
    bParams.push({'name':b,'value':req.body[b]})
  }
  for (var q in req.query){
	qParams.push({'name':q,'value':req.query[q]})
  }
  console.log(bParams);
  console.log(req.body);
  var context = {};
  context.postList = bParams;
  context.queryList = qParams;
  console.log("post", context);
  res.render('postRecieved', context);
});

//Other basics from the modules
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});