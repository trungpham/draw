var _ = require('underscore');
var Drawing = require(process.cwd()+'/server/model/drawing');

module.exports = function(req, res){

    Drawing.find({drawer_id: req.session.userId}, ['external_friend'], function (err, docs) {

        var externalFriends = _.collect(docs, function(val, key){
            return val.external_friend;
        });

        res.json(externalFriends);
    });

};