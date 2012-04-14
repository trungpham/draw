var Match = require(process.cwd()+'/server/model/match');

module.exports = {

    list: function(req, res){

        Match.prepareForUser(req.session.userId, function(matches){
            res.json(matches);
        });

    }

};