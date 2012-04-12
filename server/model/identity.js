var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var IdentitySchema = new Schema({
    source: String,
    id: String,
    name: String,
    external_id: String
},
    { strict: true });

module.exports = mongoose.model('Identity', IdentitySchema);