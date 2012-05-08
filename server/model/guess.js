var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;



var GuessSchema = new Schema({
    data: Array,
    start_time: Number,
    letters: Array,
    answer: String,
    word_length: Number,
    drawing_id: {type: ObjectId, ref: 'Drawing'},
    user_id: {type: ObjectId, ref: 'User'}
});



GuessSchema.methods.verify = function(letters, callback){

    if (letters.toUpperCase() == this.answer.toUpperCase()){
        callback(null, 'CORRECT');

    }else{
        callback(null, 'INCORRECT');
    }

};

module.exports = mongoose.model('Guess', GuessSchema);
