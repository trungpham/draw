var fs = require('fs');
var ejs = require('ejs');

var Config = require(process.cwd()+'/config');
var INDEX_TPL;

if (process.env.NODE_ENV == 'production'){
    INDEX_TPL = fs.readFileSync(process.cwd() + '/client/static/build/production/index.html', 'utf8');
}else{
    INDEX_TPL = fs.readFileSync(process.cwd() + '/client/static/index.html', 'utf8');
}



module.exports = {

   index: function(req, res){
       res.send(ejs.render(INDEX_TPL, {locals: {fbAppId: Config.facebook.appId} }));

   }

};