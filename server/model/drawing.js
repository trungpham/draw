var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var _ = require('underscore');

var User = require(process.cwd()+'/server/model/user');
var Word = require(process.cwd()+'/server/model/word');
var Guess = require(process.cwd()+'/server/model/guess');
var Alphabet = require(process.cwd()+'/server/model/alphabet');


var DrawingSchema = new Schema({
    created_time: { type: Date, default: Date.now },
    data: Array,
    match_id: {type: ObjectId, ref: 'Match'}, //let it be empty if the user is inviting a facebook friend who has not signed up yet
    external_friend: {
        id: ObjectId,
        name: String,
        xid: String,
        source: String
    }, //populate this if the invitee does not exist in the system yet
    word_id: {type: ObjectId, ref: 'Word'},
    drawer_id: {type: ObjectId, ref: 'User'},
    turn_completed: Boolean,
    turn: Number, //what turn this drawing is on
    state: String //could be drawn/guessed/forfeited
});

DrawingSchema.methods.createGuess = function(userId, done){
    var drawing = this;

    Guess.findOne({drawing_id: this.id, user_id: userId}).run(function(err, guess){

        if (guess){
            done(err, guess);
        }else{

            Word.findById(drawing.word_id).run(function(err, word){

                var letters = word.value.toUpperCase().split('');

                var i;
                var alphabetSize = Alphabet[word.locale].length;
                for (i = letters.length; i < 12 ; i++){
                    letters.push(Alphabet[word.locale][Math.floor(Math.random()*alphabetSize)]);
                }

                var guess = new Guess({
                    answer: word.value,
                    word_length: word.value.length,
                    letters: _.shuffle(letters),
                      user_id: userId,
                      drawing_id: drawing.id

                });

                guess.save(function(err){
                    done(err, guess);
                });

            });

        }

    });





};

module.exports = mongoose.model('Drawing', DrawingSchema);
