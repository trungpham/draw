var mongoose = require('mongoose');

//connect to the mongoose database
mongoose.connect('mongodb://localhost/draw_test');

mongoose.set('debug', true);

global.mongoose = mongoose;
global.async = require('async');

global.expect = require('expect.js');

global.User = require(process.cwd()+'/server/model/user');
global.Drawing = require(process.cwd()+'/server/model/drawing');
global.Match = require(process.cwd()+'/server/model/match');

global._ = require('underscore');
