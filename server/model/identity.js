var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var IdentitySchema = new Schema({
    source: String,
    id: String,
    data: String
},
    { strict: true });

mongoose.model('Identity', IdentitySchema);