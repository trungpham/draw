var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var GuessSchema = new GuessSchema({
    data: Array,
    start_time: Number,
    letters: Array,
    word_length: Number
});

mongoose.model('Guess', GuessSchema);
