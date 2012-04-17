describe('Model.Match', function(){



    describe('prepareForUser', function(){

        var user;
        var friend1;
        var friend2;
        var friend3;
        var friend4;
        var friend5;
        var match1;
        var match2;
        var match3;
        var match4;
        var match5;
        var match1drawing1;
        var match2drawing1;
        var match3drawing1;
        var match3drawing2;
        var match4drawing1;
        var match5drawing1;
        var match5drawing2;

        before(function(done){
            User.collection.drop();
            Match.collection.drop();
            Drawing.collection.drop();

            user = new User({
                    name: 'user',
                    identities: [{
                        source: 'fb',
                        xid: '100'
                    }]

                });



            friend1 = new User({
                name: 'friend1',
                identities: [{
                    source: 'fb',
                    xid: '101'
                }]
            });

            friend2 = new User({
                name: 'friend2',
                identities: [{
                    source: 'fb',
                    xid: '102'
                }]
            });


            friend3 = new User({
                name: 'friend3',
                identities: [{
                    source: 'fb',
                    xid: '103'
                }]
            });

            friend4 = new User({
                name: 'friend4',
                identities: [{
                    source: 'fb',
                    xid: '104'
                }]
            });

            friend5 = new User({
                name: 'friend5',
                identities: [{
                    source: 'fb',
                    xid: '105'
                }]
            });

            match1 = new Match({
                users: [user.id, friend1]
            });

            match2 = new Match({
                users: [user.id, friend2]
            });

            match3 = new Match({
                users: [user.id, friend3]
            });

            match4 = new Match({
                users: [user.id, friend4]
            });

            match5 = new Match({
                users: [user.id, friend5]
            });

            //user drew a drawing for friend to guess
            match1drawing1 = new Drawing({
                match_id: match1.id,
                drawer_id: user.id,
                turn: 1,
                state: 'drawn'
            });

            //friend drew a drawing for user to guess
            match2drawing1 = new Drawing({
                match_id: match2.id,
                drawer_id: friend2.id,
                turn: 1,
                state: 'drawn'

            });

            //friend correctly guessed the user's drawing
            match3drawing1 = new Drawing({
              match_id: match3.id,
              drawer_id: user.id,
              turn: 1,
              state: 'guessed' //correctly guessed
            });
            //friend drew a new drawing for user to guess
            match3drawing2 = new Drawing({
              match_id: match3.id,
              drawer_id: friend3.id,
              turn: 2,
              state: 'drawn'
            });

            //friend gave up on the user's drawing
            match4drawing1 = new Drawing({
              match_id: match4.id,
              drawer_id: user.id,
              turn: 1,
              state: 'forfeited'
            });

            //friend gave up but start a new turn with user
            match5drawing1 = new Drawing({
                      match_id: match5.id,
                      drawer_id: user.id,
                      turn: 1,
                      state: 'forfeited'
            });
            match5drawing2 = new Drawing({
                      match_id: match5.id,
                      drawer_id: friend5.id,
                      turn: 1,
                      state: 'drawn'
            });




            async.series([
                function(cb){
                    User.collection.remove(cb);
                },
                function(cb){
                    Match.collection.remove(cb);
                },
                function(cb){
                    Drawing.collection.remove(cb);
                },
                function(cb){ user.save(cb)},
                function(cb){ friend1.save(cb)},
                function(cb){ friend2.save(cb)},
                function(cb){ friend3.save(cb)},
                function(cb){ friend4.save(cb)},
                function(cb){ friend5.save(cb)},
                function(cb){

                    match1.save(cb);

                },
                function(cb){
                    match2.save(cb);
                },
                function(cb){
                    match3.save(cb);
                },
                function(cb){
                    match4.save(cb);
                },
                function(cb){
                    match5.save(cb);
                },
                function (cb) {
                    match1drawing1.save(cb);
                },
                function (cb) {
                    match2drawing1.save(cb);
                },
                function (cb) {
                    match3drawing1.save(cb);
                },
                function (cb) {
                    match3drawing2.save(cb);
                },
                function (cb) {
                    match4drawing1.save(cb);
                },            function (cb) {
                            match5drawing1.save(cb);
                        },
                function (cb) {
                    match5drawing2.save(cb);
                }

            ],
                function(err, results){
                    expect(err).to.be(undefined);

                    done();
                }
            );



        });


            it('should return 1 match for friend 1 with a drawing to guess', function(done){
                Match.prepareMatchesForUser(friend1.id, function(results){
                    expect(results).to.eql(
                        [
                            {
                                id: match1.id,
                                external_friend: {
                                    name: user.name,
                                    xid: user.identities[0].xid,
                                    source: user.identities[0].source
                                },
                                drawing_to_guess: {
                                    id: match1drawing1.id,
                                    turn: parseInt(match1drawing1.turn,0)
                                }

                            }


                        ]
                    );

                    done();
                });

            });

            it('should return 1 match for friend 2 without any drawing', function(done){
                Match.prepareMatchesForUser(friend2.id, function(results){
                    expect(results).to.eql(
                        [
                            {
                                id: match2.id,
                                external_friend: {
                                    name: user.name,
                                    xid: user.identities[0].xid,
                                    source: user.identities[0].source
                                }

                            }


                        ]
                    );

                    done();
                });

            });


            it('should return 1 match for friend 3 without any drawing', function(done){
                Match.prepareMatchesForUser(friend3.id, function(results){
                    expect(results).to.eql(
                        [
                            {
                                id: match3.id,
                                external_friend: {
                                    name: user.name,
                                    xid: user.identities[0].xid,
                                    source: user.identities[0].source
                                }

                            }


                        ]
                    );

                    done();
                });

            });


            it('should include drawing to playback and drawing to guess', function(done){

                Match.prepareMatchesForUser(user.id, function(results){

                    var thirdMatch = _.find(results, function(result){
                        return match3.id == result.id;

                    });


                    expect(thirdMatch).to.eql({
                        id: match3.id,
                        external_friend: {
                            name: friend3.name,
                            xid: friend3.identities[0].xid,
                            source: friend3.identities[0].source
                        },
                        drawing_to_playback: {
                            id: match3drawing1.id,
                            turn: parseInt(match3drawing1.turn)
                        },
                        drawing_to_guess: {
                            id: match3drawing2.id,
                            turn: parseInt(match3drawing2.turn)
                        }

                    });

                    done();

                });

            });

            it('should let the drawer see his friend gave up on the drawing', function(done){

                Match.prepareMatchesForUser(user.id, function(results){

                    var fourthMatch = _.find(results, function(result){
                        return match4.id == result.id;

                    });


                    expect(fourthMatch).to.eql({
                        id: match4.id,
                        external_friend: {
                            name: friend4.name,
                            xid: friend4.identities[0].xid,
                            source: friend4.identities[0].source
                        },
                        drawing_to_playback: {
                            id: match4drawing1.id,
                            turn: parseInt(match4drawing1.turn)
                        }
                    });

                    done();

                });

            });

            it('should not let the user who gave up any drawing to guess or draw', function(done){

                Match.prepareMatchesForUser(friend4.id, function(results){

                    var gaveUpMatch = _.find(results, function(result){
                        return match4.id == result.id;

                    });


                    expect(gaveUpMatch).to.eql({
                        id: match4.id,
                        external_friend: {
                            name: user.name,
                            xid: user.identities[0].xid,
                            source: user.identities[0].source
                        }
                    });

                    done();

                });

            });

            it('should let the drawer see his friend gave up on the drawing along with the new drawing to guess', function(done){

                Match.prepareMatchesForUser(user.id, function(results){

                    var fifthMatch = _.find(results, function(result){
                        return match5.id == result.id;

                    });


                    expect(fifthMatch).to.eql({
                        id: match5.id,
                        external_friend: {
                            name: friend5.name,
                            xid: friend5.identities[0].xid,
                            source: friend5.identities[0].source
                        },
                        drawing_to_playback: {
                            id: match5drawing1.id,
                            turn: parseInt(match5drawing1.turn)
                        },
                        drawing_to_guess: {
                            id: match5drawing2.id,
                            turn: parseInt(match5drawing2.turn)
                        }
                    });

                    done();

                });

            });

    });


    describe('createMatchesForUser', function(){

        var user;
        var friend1;
        var friend2;
        var drawing1;
        var drawing2;
        var match;
        before(function(done){

            User.collection.drop();
            Match.collection.drop();
            Drawing.collection.drop();


            async.series([
                function (cb) {
                    user = new User({
                        name:'user',
                        identities:[
                            {
                                source:'fb',
                                xid:'100'
                            }
                        ]

                    });

                    user.save(cb);
                }, function (cb) {
                    friend1 = new User({
                        name:'friend1',
                        identities:[
                            {
                                source:'fb',
                                xid:'101'
                            }
                        ]
                    });
                    friend1.save(cb);
                }, function (cb) {
                    friend2 = new User({
                        name:'friend2',
                        identities:[
                            {
                                source:'fb',
                                xid:'102'
                            }
                        ]
                    });
                    friend2.save(cb);
                }, function (cb) {
                    drawing1 = new Drawing({
                        drawer_id:friend1.id,
                        turn:1,
                        state:'drawn',
                        external_friend:{
                            name:'friend',
                            xid:'100',
                            source:'fb'
                        }

                    });
                    drawing1.save(cb);
                }
                , function (cb) {
                    drawing2 = new Drawing({
                        drawer_id:friend2.id,
                        turn:1,
                        state:'drawn',
                        external_friend:{
                            name:'friend',
                            xid:'100',
                            source:'fb'
                        }

                    });
                    drawing2.save(cb);
                },

                function(cb){
                    match = new Match({
                        users: [user.id, friend1.id]
                    });

                    match.save(cb);

                }
            ],function(err, results){
                done();

            });

        });
        it('should create a match for a use who just signed up', function(done){
            async.series([
                function(cb){
                    Match.where('users', user.id).run(function(err, docs){
                        expect(docs.length).to.equal(1);
                        cb();
                    });

                }, function(cb){
                    expect(drawing2.match_id).to.be(undefined);
                    Match.createMatchesForUser(user, function(){

                        Match.where('users', user.id).run(function(err, docs){
                            expect(docs.length).to.equal(2);


                            Drawing.findById(drawing2.id, function(err, drawing2){
                                expect(drawing2.match_id).to.eql(docs[1]._id);
                                cb();
                            })
                        });

                    });
                }
            ], function(){

                done();

            });
        });

    });
});