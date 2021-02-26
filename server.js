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


const server = app.listen(8000, function() {
  console.log("listening on port 8000");
});


const io = require('socket.io')(server);


io.sockets.on('connection', function(socket) {
  socket.on("formulario_publicado", function(data){
    console.log(data.user);
    
    socket.emit('mensaje_actualizado', {
      response: data.user,
    });

    socket.emit('numero_aleatorio', {
      random_no: Math.floor(Math.random()*1000 + 1)
    });
  });
});
