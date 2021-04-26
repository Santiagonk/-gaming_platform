const express = require('express');
const path = require("path");
const app = express();
const httpServer = require('http').createServer(app);
//const server = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:8000/"],
    methods: ["GET", "POST"]
  }
});

const helmet = require("helmet");
var cors = require('cors');

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({
     extended: true
   }));
//static files
app.use("/",express.static(path.join(__dirname, "/")));
//redirect
app.get('/', function(req, res){
    res.redirect('/');   
  });
//io.listen(8000);
httpServer.listen(8000, () => {
    console.log('listening on *:8000');
  });