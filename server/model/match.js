var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var MatchSchema = new Schema({
    created_time: Number,
    users: [{type: ObjectId, ref: 'User'}]


});


MatchSchema.statics.prepareForUser = function (userId, cb) {
    cb([
        {
            id:'matchid',
            turn:1,
            drawing:{
                id:1
            },
            external_friend:{
                xid:1,
                name:'trung',
                source:'fb'
            },
            action:'wait' //or guess or playback or retry
        }
    ]
    );
};

module.exports = mongoose.model('Match', MatchSchema);