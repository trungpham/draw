var Match = require(process.cwd()+'/server/model/match');

module.exports = {

    list: function(req, res){

        Match.prepareMatchesForUser(req.session.userId, function(matches){
            res.json(matches);
        });

    }

};