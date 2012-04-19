var Drawing = require(process.cwd()+'/server/model/drawing');

var Word = require(process.cwd()+'/server/model/word');

var User = require(process.cwd()+'/server/model/user');

describe('Server.Model.Drawing', function(){


    describe('createGuess', function(){
        var user;
        var drawing;
        var guesser;

        before(function(done){

            user = new User({
                        name: 'user',
                        identities: [{
                            source: 'fb',
                            xid: '100'
                        }]

                    });

            guesser = new User({
                        name: 'guesser',
                        identities: [{
                            source: 'fb',
                            xid: '101'
                        }]

                    });

            var word = new Word({
                value: 'tesk',
                difficulty: 'easy',
                locale: 'en_US'
            });

            drawing = new Drawing({
                            drawer_id: user.id,
                            turn: 1,
                            state: 'drawn',
                            word_id: word.id
                        });



            async.forEachSeries([user, drawing, word], function(item, cb){
                item.save(cb);
            }, function(err){

                done();

            });

        });

        it('should create a guess for the user', function(done){

            drawing.createGuess(guesser, function(err, guess){

                expect(guess.word_length.toString()).to.eql(4);
                expect(guess.answer).to.eql('tesk');
                expect(guess.letters.length).to.eql(12);
                expect(guess.letters).to.contain('T');
                expect(guess.letters).to.contain('E');
                expect(guess.letters).to.contain('S');
                expect(guess.letters).to.contain('K');
                expect(guess.user_id.toString()).to.eql(guesser.id);
                expect(guess.drawing_id.toString()).to.eql(drawing.id);
                done();

            });
        });

        it('should not create another guess for the same user', function(done){

            drawing.createGuess(guesser, function(err, guess1){

                drawing.createGuess(guesser, function(err, guess2){

                    expect(guess1).not.to.be(null);
                    expect(guess1.id).to.eql(guess2.id);
                    done();
                });

            });

        });
    });

});