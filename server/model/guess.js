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


module.exports = mongoose.model('Guess', GuessSchema);
