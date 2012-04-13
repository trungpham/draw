var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

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
    seen_by_drawer: Boolean,
    turn: Number, //what turn this drawing is on
    state: String //could be drawn/guessed/forfeited
});

module.exports = mongoose.model('Drawing', DrawingSchema);
