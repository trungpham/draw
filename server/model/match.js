var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var MatchSchema = new Schema({
    created_time: Number,
    users: [{type: ObjectId, ref: 'User'}],


});

mongoose.model('Match', MatchSchema);