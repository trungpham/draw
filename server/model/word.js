var mongoose = require('mongoose'), Schema = mongoose.Schema;

var WordSchema = new Schema({

    value: String,
    difficulty: String,
    locale: String

});

mongoose.model('Word', WordSchema);

