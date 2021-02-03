const express = require("express");
app = express();
port = 8000;

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static("static"));
app.use( express.json() );
app.use( express.urlencoded({extended:true}));

app.get('/', function(req, res) {
  res.render('index');
});


app.post('/result', function(req, res) {
  const info= req.body;
  
  res.render('result',{
    name: req.body.name,
    location: req.body.location,
    flen: req.body.flen,
    comments: req.body.comments,
    
  });

  //res.render('/result', {info: req.body});
});



app.listen(8000, function() {
  console.log("listening on port 8000");
});