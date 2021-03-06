var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var MatchSchema = new Schema({
    created_time: { type: Date, default: Date.now },
    users: [{type: ObjectId, ref: 'User'}]


});


var User = require(process.cwd()+'/server/model/user');

var Drawing = require(process.cwd()+'/server/model/drawing');

var _ = require('underscore');

var async = require('async');

MatchSchema.statics.prepareMatchesForUser = function (userId, cb) {
//    cb([
//        {
//            id:'matchid',
//            drawing_to_guess: {
//                turn: 2,
//                id: 2
//            },
//            drawing_to_playback: {
//                id: 1,
//                turn:1
//            },
//            external_friend:{
//                xid:1,
//                name:'trung',
//                source:'fb'
//            }
//        }
//    ]
//    );


    var users;
    var matches;
    var drawings;
    //find all the matches including this user

    var _this = this;
    async.series([


        function (cb) {
            _this.find({users:userId}).run(function (err, docs) {

                matches = docs;

                cb();//done
            });
        },
        function (cb) {

            //load up the users and drawings at the same time
            async.parallel([
                //find users
                function (cb) {
                    var userIds = _.uniq(_.flatten(_.pluck(matches, 'users')));

                    User.find().$in('_id', userIds).run(function (err, docs) {

                        users = docs;

                        cb();
                    });

                },
                //find drawings
                function (cb) {
                    var matchIds = _.pluck(matches, 'id');
                    Drawing.find().$in('match_id', matchIds).$ne('turn_completed', true).run(function (err, docs) {

                        drawings = docs;

                        cb();
                    });
                }

            ], function (err, result) {

                cb();

            });

        }


    ],
        //do the real work in this function after all the data has been fetched
        function (err) {

            var drawingsByMatch = _.groupBy(drawings, 'match_id');
            var matchesById = _.groupBy(matches, 'id');
            var usersById = _.groupBy(users, 'id');

            var results = _.map(drawingsByMatch, function(drawings, match_id){
                var match = matchesById[match_id][0];

                var friendId = _.find(match.users, function(id){ return id != userId });

                var friend = usersById[friendId][0];


                var result = {
                        id: match_id,
                        external_friend: {
                            name: friend.get('name'),
                            xid: friend.identities[0].xid,
                            source: friend.identities[0].source
                        }
                    };


                _.each(drawings, function(drawing){

                    //if it's my friend's drawing
                    if (drawing.drawer_id != userId){

                        //my friend just drew it
                        if (drawing.state == 'drawn'){
                            result.drawing_to_guess = {
                                id: drawing.id,
                                turn: parseInt(drawing.turn, 10)

                            }
                        }


                    }else{ // then it must be my drawing
                        if (drawing.state == 'guessed' || drawing.state == 'forfeited'){

                            result.drawing_to_playback = {
                                id: drawing.id,
                                turn: parseInt(drawing.turn, 10)

                            }

                        }

                    }

                });

                return result;


            });


            cb(results);

        }

    );



};


MatchSchema.statics.createMatchesForUser = function(user, done){

    var Match = this;
    var matches;
    var drawings;
    async.parallel([
        function(cb){
            Match.where('users', user.id).run(function(err, docs){
                matches = docs;
                cb();
            });
        }, function(cb){
            Drawing.where('external_friend.xid', user.identities[0].xid).
                where('external_friend.source', user.identities[0].source).
                exists('match_id', false).
                run(function(err, docs){
                    drawings = docs;
                    cb();
                });


        }

    ], function(){

        //create matches where user isn't already in one.
        _.each(drawings, function(drawing, i){

            //is this user and this drawer already in a match
            var userInMatch = _.find(matches, function(match, i){
               return _.difference([match.users[0].id, match.users[1].id], [user._id.id, drawing.drawer_id.id]).length == 0;
            });

            //user is not in any match then create a match for this user
            if (!userInMatch){

                var newMatch = new Match();

                newMatch.users.push(user.id);
                newMatch.users.push(drawing.drawer_id);

                newMatch.save(function(err){

                    drawing.match_id = newMatch._id;
                    drawing.save(function(err){

                    });

                });



            }

        });
        done();

    });




};

module.exports = mongoose.model('Match', MatchSchema);
