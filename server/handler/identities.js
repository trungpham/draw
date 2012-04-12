var Identity = require(process.cwd()+'/server/model/identity');

module.exports = {

    create: function(req, res){
        var identity = new Identity(req.body);
        identity.save();

        res.send(identity.toJSON());

    }

};