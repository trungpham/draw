var _ = require('underscore');
var Drawing = require(process.cwd()+'/server/model/drawing');

module.exports = function(req, res){

    Drawing.where('drawer_id', req.session.userId).where('match_id', null).select('external_friend').run(function (err, docs) {

        var externalFriends = _.collect(docs, function(val, key){
            return val.external_friend;
        });

        res.json(externalFriends);
    });

};