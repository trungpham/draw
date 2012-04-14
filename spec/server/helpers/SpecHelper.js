var mongoose = require('mongoose');

//connect to the mongoose database
mongoose.connect('mongodb://localhost/draw_test');

module.exports = {
    mongoose: mongoose,
    User: require(process.cwd()+'/server/model/user'),
    Drawing: require(process.cwd()+'/server/model/drawing'),
    Match: require(process.cwd()+'/server/model/match')
};
