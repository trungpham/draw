var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var IdentitySchema = new Schema({
    source: String,
    id: String,
    data: String
},
    { strict: true });

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    name: String,
    email: String,
    identities : [IdentitySchema]
},
    { strict: true });

UserSchema.methods.toAuthableJSON = function(){
    return {
        id: this.id,
        name: this.name
    }
};


mongoose.model('User', UserSchema);