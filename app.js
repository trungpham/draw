// My SocketStream app

var ss = require('socketstream'),
    express = require('express'),
    authenticate = require('./server/handler/authenticate'),
    mongoose = require('mongoose');

//connect to the mongoose database
mongoose.connect('mongodb://localhost/draw_dev');

// Define a single-page client
ss.client.define('main', {
  view: 'app.jade',
  css:  ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
});

function routes(app){
    app.get('/2', function (req, res) {
        res.serve('main')}
    );

    app.post('/authenticate/facebook', authenticate.fbSignedRequest);
};

// Remove to use only plain .js, .html and .css files if you prefer
ss.client.formatters.add(require('ss-coffee'));
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production') ss.client.packAssets();


var app = express.createServer(
    ss.http.middleware,
    express.bodyParser(),
    express.router(routes)
);

// Start web server
var server = app.listen(3000);

// Start SocketStream
ss.start(server);