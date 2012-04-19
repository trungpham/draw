var mongoose = require('mongoose'), Schema = mongoose.Schema;
var async = require('async');

var WordSchema = new Schema({

    value: String,
    difficulty: String,
    locale: String,
    random: {type: Number, default: Math.random}

});

WordSchema.statics.getRandomWordSet = function(done){
    var Word = this;
    async.map([
        {
            difficulty: 'easy',
            random: Math.random()
        },
        {
            difficulty: 'medium',
            random: Math.random()
        },
        {
            difficulty: 'hard',
            random: Math.random()
        }

    ], function(item, cb){

        Word.findOne().where('difficulty', item.difficulty).$lte('random', item.random).run(function(err, word){

            if (!err){
                if (!word){
                    Word.findOne().where('difficulty', item.difficulty).$gte('random', item.random).run(function(err, word){
                        cb(err, word);
                    });
                }else{

                    cb(err, word);
                }
            }else{
                cb(err, word);
            }


        });

    }, function(err, results){
        done(err, results);
    });
};

module.exports = mongoose.model('Word', WordSchema);


