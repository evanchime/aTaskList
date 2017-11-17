var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');
var port = 8080; //heroku default port; 

// Create the Express application object
var app = express();

app.use(helmet()); // Protect against web vulnerabilities
app.use(compression()); //Compress all routes

//Api
var tasks = require('./routes/tasks');

//For cross origin resource sharing
app.use(cors());

//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Main route
app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// For the Api
app.use('/api', tasks); 

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Error Middleware
app.use(function(err, req, res, next) {
    if(err) {
        res.status(err.status || 500)
        .type('txt')
        .send(err.message || 'SERVER ERROR');
    }  
})

//Server
app.listen(process.env.PORT || port, function(){
	console.log('server listening at port ' + port);
});
