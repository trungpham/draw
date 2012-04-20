// My SocketStream app

var ss = require('socketstream'),
    express = require('express'),
    authenticate = require('./server/handler/authenticate'),
    mongoose = require('mongoose');


ss.client.set({liveReload: false});

//overriding toJSON
var oldToJSON = mongoose.Document.prototype.toJSON;

mongoose.Document.prototype.toJSON = function(){
    var json = oldToJSON.call(this, arguments);
    json.id = json._id;
    delete json._id;
    return json;
};


var drawingsHandler = require('./server/handler/drawings');

var pendingInvitesHandler = require('./server/handler/api/pending_invites');

var matchesHandler = require('./server/handler/matches');

var wordsHandler = require('./server/handler/words');

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

    app.post('/drawings.json', drawingsHandler.create);
    app.get('/drawings/:id.json', drawingsHandler.show);


    app.post('/authenticate/facebook', authenticate.fbSignedRequest);

    app.get('/api/pendingInvites', pendingInvitesHandler);

    app.get('/matches', matchesHandler.list);

    app.get('/words', wordsHandler.list);

};

// Remove to use only plain .js, .html and .css files if you prefer
ss.client.formatters.add(require('ss-coffee'));
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production') ss.client.packAssets();

mongoose.set('debug', true);

var app = express.createServer(
    ss.http.middleware,
    express.bodyParser(),
    express.router(routes)
);

// Start web server
var server = app.listen( process.env.PORT || 3000);

// Start SocketStream
ss.start(server);